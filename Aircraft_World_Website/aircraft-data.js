/* aircraft-data.js
   HOW TO ADD AN AIRCRAFT: copy one row inside ROWS and edit the values.
   Order of values must match FIELDS. Units: speed km/h, range km, ceiling m, weight kg, length/span m.
   Use null when a value is not applicable or varies too much by variant.
   The aircraft name says which variant the numbers describe (e.g. "F-35A", "A350-900").
   IMAGES: put a photo in the images/ folder named after the aircraft (see images/README.txt for the
   exact file names), e.g. images/f-22-raptor.jpg. It is picked up automatically.
   Optional: the last value in a row (img) can override this with any image path or URL.
   If an image is missing or broken, the card shows a clean placeholder instead. */

const FIELDS = ['name','maker','country','cat','gen','first','role','crew','engine',
                'vmax','cruise','range','ceiling','mtow','len','span','fact','img'];

const ROWS = [
// ---- Fighters ----
['F-22 Raptor','Lockheed Martin','USA','Fighter',5,'1997','Air superiority','1','2× Pratt & Whitney F119',2410,null,2960,19800,38000,18.9,13.6,'Can supercruise: fly supersonic without afterburners.'],
['F-35A Lightning II','Lockheed Martin','USA','Fighter',5,'2006','Multirole stealth','1','1× Pratt & Whitney F135',1930,null,2800,15200,31800,15.7,10.7,'Built in three versions: F-35A (land), F-35B (short takeoff/vertical landing), F-35C (carrier).'],
['F-15C Eagle','McDonnell Douglas (Boeing)','USA','Fighter',4,'1972','Air superiority','1','2× Pratt & Whitney F100',2655,null,4630,20000,30845,19.4,13.0,'Has over 100 air-to-air victories and no recorded air-combat losses.'],
['F-16C Fighting Falcon','General Dynamics (Lockheed Martin)','USA','Fighter',4,'1974','Multirole','1','1× GE F110 or P&W F100',2120,null,4220,15240,19200,15.0,9.96,'First production fighter with fly-by-wire controls.'],
['Rafale C','Dassault Aviation','France','Fighter','4.5','1986','Multirole (omnirole)','1','2× Snecma M88',1912,null,3700,15235,24500,15.3,10.9,'The naval Rafale M flies from the carrier Charles de Gaulle.'],
['Eurofighter Typhoon','Eurofighter GmbH','Europe','Fighter','4.5','1994','Multirole','1','2× Eurojet EJ200',2495,null,3790,16765,23500,15.96,10.95,'A four-nation programme: UK, Germany, Italy and Spain.'],
['Gripen E','Saab','Sweden','Fighter','4.5','2017 (Gripen C: 1988)','Multirole','1','1× GE F414G',2200,null,4000,16000,16500,15.2,8.6,'Designed to operate from short roads and rough airstrips.'],
['Su-57','Sukhoi','Russia','Fighter',5,'2010','Multirole stealth','1','2× Saturn AL-41F1',2600,null,3500,20000,35000,20.1,14.1,"Russia's first fifth-generation stealth fighter."],
['Su-30MKI','Sukhoi (built by HAL in India)','Russia','Fighter','4.5','1997','Air superiority / strike','2','2× Saturn AL-31FP',2120,null,3000,17300,38800,21.9,14.7,'Thrust-vectoring nozzles allow extreme manoeuvres such as the "Cobra".'],
['Tejas Mk1','HAL','India','Fighter',4,'2001','Light multirole','1','1× GE F404-IN20',1975,null,3000,15200,13500,13.2,8.2,"India's indigenous light combat aircraft."],
// ---- Commercial ----
['Airbus A220-300','Airbus (ex-Bombardier)','Canada','Commercial',null,'2013','Narrow-body airliner','2 pilots / 130–160 pax','2× Pratt & Whitney PW1500G',870,828,6300,12500,67585,38.7,35.1,'Began life as the Bombardier CSeries.'],
['Airbus A320neo','Airbus','Europe','Commercial',null,'1987 (neo: 2014)','Narrow-body airliner','2 pilots / 150–186 pax','2× CFM LEAP-1A or PW1100G',871,828,6300,12000,79000,37.6,35.8,'Among the best-selling airliners of all time.'],
['Airbus A350-900','Airbus','Europe','Commercial',null,'2013','Wide-body airliner','2 pilots / 300–350 pax','2× Rolls-Royce Trent XWB',945,903,15000,13100,283000,66.8,64.75,'More than half of its structure is carbon-fibre composite.'],
['Airbus A380-800','Airbus','Europe','Commercial',null,'2005','Double-deck wide-body','2 pilots / 525 typical (853 max)','4× Rolls-Royce Trent 900 or EA GP7200',945,903,15200,13100,575000,72.7,79.75,"The world's largest passenger airliner, with two full-length decks."],
['Boeing 737-800','Boeing','USA','Commercial',null,'1967 (737-800: 1997)','Narrow-body airliner','2 pilots / 162–189 pax','2× CFM56-7B',946,839,5400,12500,79000,39.5,35.8,'The 737 family is the most-produced jet airliner line in history.'],
['Boeing 747-400','Boeing','USA','Commercial',null,'1969 (747-400: 1988)','Jumbo wide-body','2 pilots / 416 typical','4× GE CF6, P&W PW4000 or RR RB211',988,913,13450,13700,396900,70.7,64.4,'Nicknamed "Queen of the Skies"; its upper-deck hump is iconic.'],
['Boeing 777-300ER','Boeing','USA','Commercial',null,'1994 (-300ER: 2003)','Wide-body airliner','2 pilots / 350–396 pax','2× GE90-115B',945,892,13650,13100,351500,73.9,64.8,'Its GE90 engines are among the most powerful jet engines ever built.'],
['Boeing 787-9','Boeing','USA','Commercial',null,'2009 (787-8)','Wide-body airliner','2 pilots / 290 typical','2× GE GEnx or RR Trent 1000',954,903,14140,13100,254000,62.8,60.1,'The first large airliner with a mostly composite airframe.'],
['Embraer E195-E2','Embraer','Brazil','Commercial',null,'2016','Regional jet','2 pilots / 120–146 pax','2× Pratt & Whitney PW1900G',870,833,4815,12200,61500,41.5,35.1,'Geared turbofans make it far more fuel-efficient than the first-generation E195.'],
['ATR 72-600','ATR','France','Commercial',null,'1988','Regional turboprop','2 pilots / 70–78 pax','2× Pratt & Whitney Canada PW127M',510,510,1528,7620,23000,27.2,27.05,'One of the most widely used regional turboprops.'],
// ---- Military (non-fighter), helicopter ----
['B-2 Spirit','Northrop Grumman','USA','Military',null,'1989','Stealth strategic bomber','2','4× GE F118-GE-100',1010,null,11000,15200,171000,21.0,52.4,'A flying wing with no vertical tail; only 21 were built.'],
['A-10C Thunderbolt II','Fairchild Republic','USA','Military',null,'1972','Close air support','1','2× GE TF34-GE-100',706,null,4150,13636,23000,16.3,17.5,'Built around a 30 mm GAU-8 Avenger cannon.'],
['P-8A Poseidon','Boeing','USA','Military',null,'2009','Maritime patrol / anti-submarine','9','2× CFM56-7B',907,null,7500,12500,85820,39.5,37.6,'Derived from the Boeing 737-800 airliner.'],
['AH-64E Apache','Boeing','USA','Helicopter',null,'1975 (YAH-64)','Attack helicopter','2','2× GE T700-701D',293,265,480,6400,10400,17.7,14.6,"Its 30 mm chain gun aims wherever the pilot's helmet looks. (Span = rotor diameter.)"],
// ---- Cargo ----
['C-130J Super Hercules','Lockheed Martin','USA','Cargo',null,'1996 (C-130 family: 1954)','Tactical airlifter','3','4× Rolls-Royce AE 2100D3',671,643,3300,8600,79400,29.8,40.4,'The C-130 family has been in continuous production since the 1950s.'],
['C-17 Globemaster III','Boeing','USA','Cargo',null,'1991','Strategic airlifter','3','4× Pratt & Whitney F117',830,null,4480,13700,265350,53.0,51.75,'Can land on short, unpaved runways despite its size.'],
['An-124 Ruslan','Antonov','Ukraine','Cargo',null,'1982','Heavy strategic airlifter','6','4× Lotarev D-18T',865,800,4800,12000,402000,69.1,73.3,'One of the largest cargo aircraft ever mass-produced.'],
// ---- Private jets ----
['Gulfstream G650','Gulfstream','USA','Private Jet',null,'2009','Ultra-long-range business jet','2 pilots / 11–19 pax','2× Rolls-Royce BR725',982,904,12964,15545,45180,30.4,30.4,'Can fly nonstop for about 13,000 km.'],
['Embraer Phenom 300E','Embraer','Brazil','Private Jet',null,'2008 (Phenom 300)','Light business jet','1–2 pilots / up to 11 pax','2× Pratt & Whitney Canada PW535E1',834,null,3650,13716,8150,15.6,16.2,'One of the best-selling light jets in the world.'],
['Dassault Falcon 7X','Dassault Aviation','France','Private Jet',null,'2005','Long-range business jet','2 pilots / 12–16 pax','3× Pratt & Whitney Canada PW307A',953,null,11019,15545,31751,23.4,26.2,'A three-engine business jet and the first with fly-by-wire controls.']
];

// Turn each row into an object: {id, name, maker, country, ...}
const AIRCRAFT = ROWS.map((row, id) =>
  Object.assign({ id }, ...FIELDS.map((f, i) => ({ [f]: row[i] }))));

// "Did you know?" facts for the home page
const FACTS = [
  'The Wright brothers made the first powered, controlled flight on 17 December 1903 at Kitty Hawk.',
  'An Airbus A380 can carry over 800 passengers in an all-economy layout.',
  'Mach 1 is the speed of sound, about 1,235 km/h at sea level.',
  'The B-2 Spirit has no tail: its flying-wing shape helps it stay hard to detect.'
];

// Quiz: [question, CORRECT answer, wrong, wrong, wrong]. Answers are shuffled when shown.
const QUIZ = [
  ['Which jet is nicknamed the "Queen of the Skies"?','Boeing 747','Airbus A380','Boeing 777','Airbus A320'],
  ['Which company builds the F-22 Raptor?','Lockheed Martin','Boeing','Dassault','Sukhoi'],
  ['Which country builds the Rafale?','France','Sweden','UK','Italy'],
  ['How many full-length passenger decks does the A380 have?','2','1','3','4'],
  ['Which fighter is made by Saab?','Gripen','Tejas','Mirage 2000','MiG-29'],
  ['Who made the first powered flight in 1903?','The Wright brothers','Louis Blériot','Charles Lindbergh','Igor Sikorsky'],
  ['Which company builds the A350?','Airbus','Boeing','Embraer','COMAC'],
  ['What does STOVL (as in F-35B) stand for?','Short Take-Off and Vertical Landing','Stealth Take-Off Vertical Lift','Supersonic Turbo Vertical Lift','Short Transit Over Land'],
  ['Which aircraft is a stealth flying-wing bomber?','B-2 Spirit','B-52','A-10','C-17'],
  ["Which is India's indigenous light combat aircraft?",'Tejas','Rafale','Su-30MKI','Jaguar'],
  ['Which engine type powers most modern airliners?','Turbofan','Ramjet','Piston engine','Pulsejet'],
  ['The C919 airliner is built by COMAC of which country?','China','Japan','Russia','India'],
  ["Which is Russia's fifth-generation stealth fighter?",'Su-57','MiG-21','Su-27','Tu-160'],
  ['What does MTOW stand for?','Maximum Takeoff Weight','Minimum Turbine Output Watts','Main Thrust Operating Weight','Mean Takeoff Wind'],
  ['Which weapon is the A-10 Thunderbolt II built around?','30 mm GAU-8 cannon','Torpedoes','Nuclear bombs','Naval guns'],
  ['Which of these is a turboprop regional airliner?','ATR 72','Boeing 787','Airbus A321','Boeing 777'],
  ['Mach 1 is the speed of what?','Sound','Light','Wind at altitude',"The Earth's rotation"],
  ['Which of these is a helicopter?','AH-64 Apache','F-16','A-10','C-130'],
  ['Which manufacturer builds the E195-E2?','Embraer','Airbus','Boeing','ATR'],
  ['Which nickname belongs to the F-16?','Fighting Falcon','Raptor','Eagle','Hornet']
];

// Automatic image path: "F-22 Raptor" -> images/f-22-raptor.jpg
// (lower-case, spaces and symbols become hyphens). Rows with their own img value keep it.
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
AIRCRAFT.forEach(a => { if (!a.img) a.img = 'images/' + slug(a.name) + '.jpg'; });
