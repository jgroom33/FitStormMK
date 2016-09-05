# Smashbeats Project

### How do I get set up?
1. git clone git@github.com:jgroom33/FitStormMK.git smashbeats
2. cd smashbeats
3. meteor (command-line)
4. Go to http://localhost:3000

### To build to production:

```bash
git checkout master
npm install -g mupx
cd smashbeats
mupx deploy --config=mup-prod.json --settings=settings.json
```

### To build to dev:

```bash
git checkout dev
npm install -g mupx
cd smashbeats
mupx deploy --config=mup.json --settings=settings.json
```

mupx setup --config=mup.json --settings=settings.json