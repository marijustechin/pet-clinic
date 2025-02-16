#Užduotis

Sukurkite gyvūnų registracijos pas gydytoją sistemą. Turi veikti FRONT ir BACK dalys.
Funkcionalumas:
Sistemoje turėtų būti dviejų tipų vartotojai registruoti klinikos pacientai ir administratorius.
Užkrovus puslapį turi būti rodoma signup arba login forma.

1. Atlikti gyvūno registraciją vizitui pas gydytoją gali tik registruoti pacientai.
2. Atlikti vizito paiešką ir rikiavimą.
3. Pacientai gali ištrinti arba pakeisti registracijos parametrus, pvz. datą.
4. Pacientai gali matyti tik savo sukurtas registracijas.
5. Pacientai gali įvertinti apsilankymo kokybę.
6. Administratorius gali matyti, patvirtinti visų pacientų registracijas, taip pat ištrinti ir
   pakoreguoti registracijų duomenis.
7. Minimalus, bet tvarkingas UI

#Sprendimas

Frontend:

1. React + Vite + Tailwindcss
2. zod, react-hook-form, redux, react-router

Backend:

1. Nodejs + express + express-validator
2. cors, jsonwebtoken, dotenv, sequelize, cookies
