/* ===========================================================================
 * CZIR62 — Moteur de parcours guide
 * ---------------------------------------------------------------------------
 * Pilote les parcours en plusieurs etapes (estimateur, assistant fuite).
 * La logique est partagee ; le contenu, les questions et le ton restent
 * propres a chaque outil — c'est le code qui est mutualise, pas l'editorial.
 *
 * Contrat DOM :
 *   [data-wz]                 racine
 *   [data-wz-step="1"]        etape (fieldset)
 *   [data-wz-num]             numero d'etape courant
 *   [data-wz-fill]            barre de progression
 *   [data-wz-choice]          bouton de reponse (data-name, data-value, data-label)
 *   [data-wz-next] / [-back]  navigation manuelle (champs libres)
 *   [data-wz-hint="nom:val"]  encart affiche selon une reponse
 *   [data-wz-recap]           recapitulatif injecte avant l'envoi
 *   [data-wz-nom] [-tel]      coordonnees
 *   [data-wz-submit]          bouton d'envoi
 *   [data-wz-error]           zone d'erreur
 *   [data-wz-done]            confirmation
 * ========================================================================= */

import { submitLead, validPhone } from './leadForm';
import { track } from './tracking';
import type { LeadOrigin } from '../leads/types';

export interface WizardOptions {
  origin: LeadOrigin;
  startEvent: string;
  completeEvent: string;
  /** Prestation rattachee au lead */
  prestation?: string;
  /** Nom du champ contenant la commune */
  communeField?: string;
}

export function initWizard(root: HTMLElement, opts: WizardOptions): void {
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-wz-step]'));
  const total = steps.length;
  const fill = root.querySelector<HTMLElement>('[data-wz-fill]');
  const num = root.querySelector<HTMLElement>('[data-wz-num]');
  const totalEl = root.querySelector<HTMLElement>('[data-wz-total]');
  const errorBox = root.querySelector<HTMLElement>('[data-wz-error]');
  const done = root.querySelector<HTMLElement>('[data-wz-done]');
  const recap = root.querySelector<HTMLElement>('[data-wz-recap]');
  const hints = Array.from(root.querySelectorAll<HTMLElement>('[data-wz-hint]'));
  const resultBlocks = Array.from(root.querySelectorAll<HTMLElement>('[data-wz-result-for]'));

  const answers: Record<string, string> = {};
  const labels: Record<string, string> = {};
  const startedAt = Date.now();
  let current = 1;
  let started = false;

  if (totalEl) totalEl.textContent = String(total);

  function show(step: number): void {
    current = Math.min(Math.max(step, 1), total);
    steps.forEach((s) => { s.hidden = Number(s.dataset.wzStep) !== current; });
    if (fill) fill.style.width = `${(current / total) * 100}%`;
    if (num) num.textContent = String(current);

    if (started) {
      const first = steps[current - 1]?.querySelector<HTMLElement>('button, input, select');
      first?.focus({ preventScroll: true });
    }
  }

  function begin(): void {
    if (started) return;
    started = true;
    track(opts.startEvent, { page: location.pathname });
  }

  /** Affiche uniquement les encarts correspondant aux reponses donnees */
  function syncHints(): void {
    hints.forEach((el) => {
      const [name, value] = (el.dataset.wzHint ?? '').split(':');
      el.hidden = answers[name] !== value;
    });
  }

  /** Affiche le bloc de synthese correspondant a la reponse pivot */
  function syncResult(): void {
    if (!resultBlocks.length) return;
    const key = resultBlocks[0].dataset.wzResultKey ?? 'projet';
    const value = answers[key];
    let matched = false;
    resultBlocks.forEach((el) => {
      const on = el.dataset.wzResultFor === value;
      el.hidden = !on;
      if (on) matched = true;
    });
    // Filet : si aucune correspondance, on affiche le bloc par defaut
    if (!matched) {
      const fallback = resultBlocks.find((el) => el.dataset.wzResultFor === 'default');
      if (fallback) fallback.hidden = false;
    }
  }

  function buildRecap(): void {
    if (!recap) return;
    const entries = Object.entries(labels).filter(([, v]) => v);
    recap.replaceChildren();
    for (const [name, value] of entries) {
      const li = document.createElement('li');
      const k = document.createElement('span');
      k.textContent = root.querySelector<HTMLElement>(`[data-wz-legend="${name}"]`)?.textContent?.trim() ?? name;
      const v = document.createElement('strong');
      v.textContent = value;
      li.append(k, v);
      recap.append(li);
    }
  }

  /* ------------------------------------------------------------ reponses */
  root.querySelectorAll<HTMLButtonElement>('[data-wz-choice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name!;
      const value = btn.dataset.value!;
      answers[name] = value;
      labels[name] = btn.dataset.label ?? btn.textContent?.trim() ?? value;

      root
        .querySelectorAll<HTMLButtonElement>(`[data-wz-choice][data-name="${CSS.escape(name)}"]`)
        .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

      begin();
      syncHints();
      syncResult();
      buildRecap();

      const next = Number(btn.dataset.goto ?? current + 1);
      if (next <= total) show(next);
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-wz-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const requires = btn.dataset.requires;
      if (requires) {
        const input = root.querySelector<HTMLInputElement>(`[data-wz-input="${requires}"]`);
        if (input && !input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          input.focus();
          return;
        }
        if (input) {
          input.removeAttribute('aria-invalid');
          answers[requires] = input.value.trim();
          labels[requires] = input.value.trim();
          buildRecap();
        }
      }
      begin();
      syncResult();
      show(Number(btn.dataset.wzNext ?? current + 1));
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-wz-back]').forEach((btn) =>
    btn.addEventListener('click', () => show(Number(btn.dataset.wzBack ?? current - 1))),
  );

  root.querySelectorAll<HTMLInputElement>('[data-wz-input]').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      steps[current - 1]?.querySelector<HTMLButtonElement>('[data-wz-next]')?.click();
    });
  });

  /* -------------------------------------------------------------- envoi */
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-wz-submit]');
  submitBtn?.addEventListener('click', async () => {
    const nomInput = root.querySelector<HTMLInputElement>('[data-wz-nom]')!;
    const telInput = root.querySelector<HTMLInputElement>('[data-wz-tel]')!;
    const hpInput = root.querySelector<HTMLInputElement>('[data-wz-hp]');

    const nom = nomInput.value.trim();
    const telephone = telInput.value.trim();

    const fail = (msg: string, el: HTMLInputElement) => {
      if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; }
      el.setAttribute('aria-invalid', 'true');
      el.focus();
    };

    if (errorBox) errorBox.hidden = true;
    if (nom.length < 2) return fail('Merci d’indiquer votre nom.', nomInput);
    nomInput.removeAttribute('aria-invalid');
    if (!validPhone(telephone)) {
      return fail('Ce numéro ne semble pas valide. Exemple attendu : 06 12 34 56 78.', telInput);
    }
    telInput.removeAttribute('aria-invalid');

    const original = submitBtn.textContent;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Envoi en cours…';

    const communeKey = opts.communeField ?? 'commune';

    const result = await submitLead({
      origin: opts.origin,
      nom,
      telephone,
      commune: answers[communeKey],
      prestation: opts.prestation,
      reponses: labels,
      startedAt,
      hp: hpInput?.value ?? '',
    });

    submitBtn.removeAttribute('aria-busy');
    submitBtn.textContent = original;

    if (!result.ok) {
      if (errorBox) { errorBox.textContent = result.error ?? 'Envoi impossible.'; errorBox.hidden = false; }
      return;
    }

    track(opts.completeEvent, { ...answers, lead_id: result.id ?? '', page: location.pathname });

    steps.forEach((s) => { s.hidden = true; });
    const progress = root.querySelector<HTMLElement>('[data-wz-progress]');
    if (progress) progress.hidden = true;
    if (done) {
      const ref = done.querySelector<HTMLElement>('[data-wz-id]');
      if (ref) ref.textContent = result.id ?? '';
      done.hidden = false;
      done.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  show(1);
  syncResult();
}
