# Repo migratie naar v2

Voer onderstaande stappen uit om een schone `v2`-repository zonder oude git-history op te zetten.

```bash
git clone https://github.com/Dj-Shortcut/senerbarbershop.git
cd senerbarbershop
rm -rf .git
git init
git add .
git commit -m "Init v2 baseline from live"
# maak nieuwe repo op GitHub: senerbarbershop-v2
git remote add origin https://github.com/Dj-Shortcut/senerbarbershop-v2.git
git branch -M main
git push -u origin main
```

## Opmerking

In deze omgeving is directe toegang naar GitHub geblokkeerd, dus `git clone`/`git push` moeten vanuit een machine met GitHub-toegang uitgevoerd worden.
