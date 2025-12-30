#!/bin/bash

rm -rf ./$2/.next
rm -rf .vercel
mkdir .vercel
cp -r ./$2/vercel-$1.json .vercel/project.json
vercel env pull .env.production.local
mv .env.production.local ./$2/
nx reset
vercel build --prod
vercel --prebuilt --prod