#!/usr/bin/env python3
"""Extraction Google Search Console -> CSV. Idempotent, pagine, throttle."""
import os, json, time, argparse, pathlib, datetime as dt
import pandas as pd
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
MAX_ROWS = 25000

def client():
    for cand in [os.environ.get("GSC_SA_JSON"),
                 str(pathlib.Path.home() / ".config/gsc/sa.json")]:
        if cand and pathlib.Path(cand).exists():
            return build("searchconsole", "v1", cache_discovery=False,
                         credentials=service_account.Credentials.from_service_account_file(cand, scopes=SCOPES))
    tok = pathlib.Path.home() / ".config/gsc/token.json"
    if tok.exists():
        return build("searchconsole", "v1", cache_discovery=False,
                     credentials=Credentials.from_authorized_user_file(str(tok), SCOPES))
    raise SystemExit("Aucun credential GSC. Voir Phase 0.")

def query(svc, site, start, end, dims, dtype="web", filters=None, state="all"):
    rows, start_row = [], 0
    while True:
        body = {"startDate": start, "endDate": end, "dimensions": dims, "type": dtype,
                "rowLimit": MAX_ROWS, "startRow": start_row, "dataState": state}
        if filters:
            body["dimensionFilterGroups"] = [{"filters": filters}]
        resp = svc.searchanalytics().query(siteUrl=site, body=body).execute()
        batch = resp.get("rows", [])
        for r in batch:
            rec = dict(zip(dims, r.get("keys", [])))
            rec.update(clicks=r["clicks"], impressions=r["impressions"],
                       ctr=r["ctr"], position=r["position"])
            rows.append(rec)
        if len(batch) < MAX_ROWS:
            break
        start_row += MAX_ROWS
        time.sleep(0.2)
    return rows

def window(days_ago_start, days_ago_end, lag=3):
    today = dt.date.today()
    return ((today - dt.timedelta(days=lag + days_ago_start)).isoformat(),
            (today - dt.timedelta(days=lag + days_ago_end)).isoformat())

def dump(rows, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(rows).to_csv(path, index=False)
    print(f"  {path}  {len(rows)} lignes")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site"); ap.add_argument("--out", default="data")
    ap.add_argument("--list-sites", action="store_true")
    a = ap.parse_args()
    svc = client()
    if a.list_sites:
        for s in svc.sites().list().execute().get("siteEntry", []):
            print(s["permissionLevel"], s["siteUrl"])
        return
    out = pathlib.Path(a.out)
    d28, dprev, dyoy = window(28, 0), window(56, 28), window(365 + 28, 365)
    d90, d16m = window(90, 0), window(485, 0)
    for rows, name in [
        (query(svc, a.site, *d16m, ["date"]), "daily.csv"),
        (query(svc, a.site, *d28, ["query"]), "query_28.csv"),
        (query(svc, a.site, *dprev, ["query"]), "query_28_prev.csv"),
        (query(svc, a.site, *d28, ["page"]), "page_28.csv"),
        (query(svc, a.site, *dprev, ["page"]), "page_28_prev.csv"),
        (query(svc, a.site, *d90, ["query", "page"]), "query_page_90.csv"),
        (query(svc, a.site, *d90, ["query", "device"]), "query_device.csv"),
        (query(svc, a.site, *d90, ["query", "country"]), "query_country.csv"),
        (query(svc, a.site, *d90, ["searchAppearance"]), "appearance.csv"),
    ]:
        dump(rows, out / name)
    totals = {}
    for name, w in {"d28": d28, "prev": dprev, "d90": d90}.items():
        r = query(svc, a.site, *w, [])
        totals[name] = r[0] if r else {}
    (out / "totals.json").write_text(json.dumps(totals, indent=2))
    print("  totals.json")

if __name__ == "__main__":
    main()
