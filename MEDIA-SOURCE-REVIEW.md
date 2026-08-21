# Third-party media source review

This is a **required pre-launch editorial and rights review**, not a claim that the current links are authorized. IdoréStudy embeds rather than hosts these files, but embedding alone does not establish that an upload is suitable for a monetized publisher site.

Before requesting AdSense review, open every source and record the current channel/uploader, title, availability, embedding status, and rights basis. Prefer official artist, label, broadcaster, publisher, or clearly authorized channels. Remove private, deleted, age-restricted, region-blocked, misleading, reuploaded, or rights-unclear sources. Keep a dated record of the decision. A working player is not enough.

For each row, replace **Pending** with **Approved** or **Removed**, add the channel name, review date, and a brief basis such as “official label channel.” Repeat this audit whenever a source changes.

## Study-buddy video sources

| Study buddy | Group | Source | Status | Channel / basis | Reviewed |
|---|---|---|---|---|---|
| Rosé | BLACKPINK | https://www.youtube.com/watch?v=oadMhHMubQ4 | Pending |  |  |
| Jennie | BLACKPINK | https://www.youtube.com/watch?v=Fe8kR3W9VGA | Pending |  |  |
| Lisa | BLACKPINK | https://www.youtube.com/watch?v=tX9rWUJUGbk | Pending |  |  |
| Jungkook | BTS | https://www.youtube.com/watch?v=xy_mVVv4Oc0 | Pending |  |  |
| V (Taehyung) | BTS | https://www.youtube.com/watch?v=Xt2wCvkSegU | Pending |  |  |
| Jimin | BTS | https://www.youtube.com/watch?v=KxE4i8-nYEs | Pending |  |  |
| Wonyoung | IVE | https://www.youtube.com/watch?v=ZZaA0c-PsXc | Pending |  |  |
| Chaewon | LE SSERAFIM | https://www.youtube.com/watch?v=3one8kjAAQI | Pending |  |  |
| Kazuha | LE SSERAFIM | https://www.youtube.com/watch?v=KznmfOQrK_E | Pending |  |  |
| Karina | aespa | https://www.youtube.com/watch?v=r6OQFloCDZw | Pending |  |  |
| Minji | NewJeans | https://www.youtube.com/watch?v=LhIivrX4gKk | Pending |  |  |
| Seulgi | Red Velvet | https://www.youtube.com/watch?v=UZOnLTTiZKY | Pending |  |  |
| Bang Chan | Stray Kids | https://www.youtube.com/watch?v=ANuQjiEMMcU | Pending |  |  |
| Felix | Stray Kids | https://www.youtube.com/watch?v=EYpwvrJlV-s | Pending |  |  |
| Han | Stray Kids | https://www.youtube.com/watch?v=TMjrez7sv5o | Pending |  |  |
| Hyunjin | Stray Kids | https://www.youtube.com/watch?v=QFfZlBdAhgs | Pending |  |  |
| Lee Know | Stray Kids | https://www.youtube.com/watch?v=9CKliRdrawg | Pending |  |  |
| Yunah | ILLIT | https://www.youtube.com/watch?v=Kz5ie0SAPJM | Pending |  |  |
| Wonhee | ILLIT | https://www.youtube.com/watch?v=gY5nbjT8ZYU | Pending |  |  |
| Moka | ILLIT | https://www.youtube.com/watch?v=fwMMBtUucng | Pending |  |  |
| Chuu | LOONA | https://www.youtube.com/watch?v=bDQRKF4jTuQ | Pending |  |  |
| Yuna | ITZY | https://www.youtube.com/watch?v=iLzKAgu_5g4 | Pending |  |  |
| Key | SHINee | https://www.youtube.com/watch?v=lMqr_YXI9IM | Pending |  |  |
| Dahyun | TWICE | https://www.youtube.com/watch?v=47ocn-7vw-E | Pending |  |  |
| Yuqi | (G)I-DLE | https://www.youtube.com/watch?v=gKIGXBkW56Y | Pending |  |  |
| Lily | NMIXX | https://www.youtube.com/watch?v=HMIUqdzm0bs | Pending |  |  |
| Rei | IVE | https://www.youtube.com/watch?v=RgVu5AehEx4 | Pending |  |  |
| Sunghoon | ENHYPEN | https://www.youtube.com/watch?v=oI7DfIUQYhI | Pending |  |  |
| Heeseung | ENHYPEN | https://www.youtube.com/watch?v=sOPAM4bojbY | Pending |  |  |

## Background-music sources

| Music option | Source | Status | Channel / basis | Reviewed |
|---|---|---|---|---|
| BLACKPINK Lo-fi Mix | https://www.youtube.com/watch?v=PjsDDmv25C4 | Pending |  |  |
| LE SSERAFIM Rainy Piano Mix | https://www.youtube.com/watch?v=I3yNehe_Zwg | Pending |  |  |
| Stray Kids Rainy Lofi | https://www.youtube.com/watch?v=zqdE_gIoykg | Pending |  |  |
| Jennie SOLO Orchestral | https://www.youtube.com/watch?v=GWR6yukGEI4 | Pending |  |  |
| BTS Rainy Day Piano Mix | https://www.youtube.com/watch?v=RdLjg7ZGxuE | Pending |  |  |
| IVE Rainy Day Piano Mix | https://www.youtube.com/watch?v=LiT2sIN-Pg8 | Pending |  |  |
| aespa Piano Mix | https://www.youtube.com/watch?v=8TF58QbQTFY | Pending |  |  |
| Red Velvet Lofi Mix | https://www.youtube.com/watch?v=Z6qTC5PY-u4 | Pending |  |  |
| XLOV Instrumentals | https://www.youtube.com/watch?v=C8_e_gER1f0 | Pending |  |  |
| ILLIT Instrumentals | https://www.youtube.com/watch?v=BTlZZu-SoAI | Pending |  |  |
| ENHYPEN Moonstruck Orchestral | https://www.youtube.com/watch?v=yCq9AHVFNKA | Pending |  |  |

## Removal or replacement workflow

1. For a study-buddy source, remove or replace the entry in `src/data/studyBuddies.js`.
2. For a music source, remove or replace the entry in `src/data/musicOptions.js`.
3. Keep the numeric ID stable when replacing a buddy so existing direct links continue to open the intended room.
4. Confirm the homepage card, `/study` lobby, direct `/study?buddy=<id>` route, embedded player, and visible source link still work.
5. Update this review row to `Approved` or `Removed`, record the current channel/basis, and add the ISO review date (`YYYY-MM-DD`).
6. Run `npm run audit`, then run the production build in a networked environment with `npm run check`.
7. Run `npm run check:prelaunch` only after every active source has a complete review record.
8. Update the content policy and privacy disclosures if the media model or platform changes.

The prelaunch audit compares active source URLs with this table. Deleting a row without deleting the active source will not pass the gate.
