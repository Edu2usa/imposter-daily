with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-17', 'Pizza', 'Food', 'Describe "Pizza" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('cheesy triangle slices', false),
('Friday night delivery', false),
('pepperoni on top', false),
('Italian round classic', false),
('foldable New York style', false),
('pineapple controversy', false),
('wood fired crust', false),
('late night box', false),
('shared at parties', false),
('crunchy and salty', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-18', 'Beach', 'Places', 'Describe "Beach" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('sand between toes', false),
('waves and sunscreen', false),
('towel and umbrella', false),
('seagulls stealing fries', false),
('salty hair afterwards', false),
('building castles', false),
('tide comes in', false),
('flip flops required', false),
('sunset over water', false),
('long lines everywhere', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-19', 'Coffee', 'Drinks', 'Describe "Coffee" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('morning survival juice', false),
('dark and bitter', false),
('barista spelled wrong', false),
('beans ground fresh', false),
('latte art foam', false),
('jitters if too much', false),
('hot or iced', false),
('Monday fuel', false),
('drip or espresso', false),
('bubbles tickle nose', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-20', 'Dog', 'Animals', 'Describe "Dog" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('loyal best friend', false),
('tail wags fast', false),
('fetch forever', false),
('barks at mailman', false),
('walks twice daily', false),
('loves belly rubs', false),
('sniffs everything', false),
('wet nose kisses', false),
('man''s best friend', false),
('sleeps upside down', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-21', 'Netflix', 'Brands', 'Describe "Netflix" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('and chill', false),
('binge whole season', false),
('are you still watching', false),
('red N logo', false),
('password sharing crackdown', false),
('stranger things home', false),
('monthly subscription', false),
('skip intro button', false),
('autoplay next episode', false),
('two day shipping', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-22', 'Rain', 'Weather', 'Describe "Rain" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('umbrella weather', false),
('puddles everywhere', false),
('gray sky drops', false),
('pitter patter roof', false),
('cancelled picnic', false),
('cozy inside day', false),
('wet socks misery', false),
('windshield wipers on', false),
('plants love it', false),
('hard to breathe', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-23', 'Guitar', 'Instruments', 'Describe "Guitar" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('six strings strummed', false),
('campfire singalong', false),
('rock star pose', false),
('acoustic or electric', false),
('calloused fingertips', false),
('wonderwall again', false),
('pick in pocket', false),
('tuning takes forever', false),
('chords and frets', false),
('black and white keys', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-24', 'Birthday', 'Events', 'Describe "Birthday" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('cake and candles', false),
('one year older', false),
('make a wish', false),
('party hats', false),
('presents wrapped up', false),
('happy song sung', false),
('balloons everywhere', false),
('annual celebration', false),
('blow out candles', false),
('white dress aisle', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-25', 'Elon Musk', 'Famous People', 'Describe "Elon Musk" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('rockets and tweets', false),
('electric car guy', false),
('richest man sometimes', false),
('bought the bird app', false),
('Mars obsessed', false),
('named kid weirdly', false),
('Tesla boss', false),
('chaos on timeline', false),
('SpaceX founder', false),
('sings about exes', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-26', 'Soccer', 'Sports', 'Describe "Soccer" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('no hands allowed', false),
('ninety minute match', false),
('world cup fever', false),
('goooooal scream', false),
('offside confusion', false),
('yellow card drama', false),
('black and white ball', false),
('penalty shootout nerves', false),
('called football elsewhere', false),
('home run swing', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-27', 'Harry Potter', 'Movies & Books', 'Describe "Harry Potter" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('boy who lived', false),
('lightning scar forehead', false),
('wand chooses wizard', false),
('Hogwarts letter', false),
('expecto patronum', false),
('platform nine three quarters', false),
('Hermione saves everyone', false),
('Voldemort nemesis', false),
('sorting hat ceremony', false),
('ring to Mordor', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-28', 'Toothbrush', 'Household Items', 'Describe "Toothbrush" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('twice a day', false),
('bristles and paste', false),
('replace every three months', false),
('minty fresh breath', false),
('dentist nagging', false),
('electric buzzing version', false),
('bathroom counter staple', false),
('scrub those molars', false),
('spit and rinse', false),
('squeezes lemon juice', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-29', 'Christmas', 'Holidays', 'Describe "Christmas" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('tree and lights', false),
('Santa comes tonight', false),
('December twenty fifth', false),
('presents under tree', false),
('ugly sweater party', false),
('stockings on mantle', false),
('jingle bells season', false),
('eggnog and cookies', false),
('mistletoe kiss', false),
('fireworks at midnight', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-30', 'iPhone', 'Tech', 'Describe "iPhone" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('Apple in pocket', false),
('blue bubbles matter', false),
('cracked screen again', false),
('new one every year', false),
('face unlock', false),
('charging cable drama', false),
('app store heaven', false),
('camera gets better', false),
('expensive rectangle', false),
('plug in headphones jack', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-10-31', 'Spider', 'Animals', 'Describe "Spider" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('eight legs crawling', false),
('web in corner', false),
('shoe comes out', false),
('nope nope nope', false),
('bites Peter Parker', false),
('itsy bitsy climbing', false),
('silk thread spinner', false),
('eats mosquitoes thankfully', false),
('arachnophobia trigger', false),
('buzzes around light', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-01', 'Gym', 'Places', 'Describe "Gym" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('leg day skipped', false),
('January crowds', false),
('sweat and iron', false),
('mirror selfies', false),
('protein shake after', false),
('membership never used', false),
('treadmill boredom', false),
('grunting guy', false),
('gains season', false),
('quiet please shushing', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-02', 'Taylor Swift', 'Famous People', 'Describe "Taylor Swift" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('eras tour', false),
('writes about exes', false),
('Swifties everywhere', false),
('shake it off', false),
('Travis Kelce girlfriend', false),
('surprise album drops', false),
('friendship bracelets', false),
('thirteen lucky number', false),
('Grammy collector', false),
('rockets to Mars', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-03', 'Sushi', 'Food', 'Describe "Sushi" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('raw fish rice', false),
('chopsticks struggle', false),
('wasabi burns nose', false),
('soy sauce dip', false),
('California roll starter', false),
('conveyor belt restaurant', false),
('seaweed wrapped', false),
('expensive little bites', false),
('omakase experience', false),
('melted cheese inside', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-04', 'Wedding', 'Events', 'Describe "Wedding" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('white dress aisle', false),
('I do moment', false),
('open bar hopes', false),
('first dance', false),
('bouquet toss', false),
('cake cutting', false),
('plus one invite', false),
('rings exchanged', false),
('father daughter dance', false),
('blow out candles', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-05', 'Minecraft', 'Video Games', 'Describe "Minecraft" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('blocks and creepers', false),
('diamond pickaxe', false),
('punching trees first', false),
('build anything imaginable', false),
('that hissing sound', false),
('nether portal', false),
('kids obsessed', false),
('square everything', false),
('survival or creative', false),
('red plumber jumps', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-06', 'Airplane', 'Transportation', 'Describe "Airplane" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('seatbelt sign on', false),
('tiny bathroom', false),
('middle seat misery', false),
('wings and turbulence', false),
('tray table up', false),
('peanuts and pretzels', false),
('clap when landing', false),
('window seat view', false),
('thirty thousand feet', false),
('rails and conductor', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-07', 'Avocado', 'Food', 'Describe "Avocado" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('toast topping tax', false),
('guac costs extra', false),
('ripe for one hour', false),
('millennial stereotype', false),
('green creamy pit', false),
('brown too fast', false),
('Mexican grocery staple', false),
('healthy fat', false),
('hard as rock then mush', false),
('peel the yellow skin', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-08', 'Monday', 'Days & Time', 'Describe "Monday" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('worst day ever', false),
('alarm clock dread', false),
('weekend over already', false),
('case of the', false),
('coffee mandatory', false),
('Garfield hates it', false),
('back to work', false),
('new week start', false),
('meetings pile up', false),
('sleep in late', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-09', 'Ocean', 'Nature', 'Describe "Ocean" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('salty blue vast', false),
('waves never stop', false),
('deepest unexplored place', false),
('sharks live here', false),
('seventy percent of Earth', false),
('whales singing', false),
('tides pulled by moon', false),
('horizon meets sky', false),
('cruise ships cross it', false),
('snow capped peak', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-10', 'Microwave', 'Household Items', 'Describe "Microwave" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('beep beep beep', false),
('popcorn button', false),
('leftovers revival', false),
('don''t put metal', false),
('thirty more seconds', false),
('exploding soup', false),
('frozen dinner hero', false),
('spinning plate inside', false),
('radiation box', false),
('spin cycle clothes', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-11', 'Zombie', 'Fiction', 'Describe "Zombie" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('brains brains brains', false),
('walking dead', false),
('headshots only', false),
('apocalypse scenario', false),
('shuffling slowly', false),
('bitten means infected', false),
('Halloween costume classic', false),
('undead horde', false),
('groaning and rotting', false),
('drinks blood nightly', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-12', 'Starbucks', 'Brands', 'Describe "Starbucks" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('green mermaid logo', false),
('venti means large', false),
('name misspelled cup', false),
('pumpkin spice season', false),
('seven dollar latte', false),
('mobile order ahead', false),
('on every corner', false),
('frappuccino sugar bomb', false),
('Wi Fi office', false),
('golden arches fries', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-13', 'Bicycle', 'Transportation', 'Describe "Bicycle" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('two wheels pedaling', false),
('training wheels first', false),
('helmet hair', false),
('never forget how', false),
('chain fell off', false),
('Tour de France', false),
('spandex optional', false),
('bell ring ring', false),
('kickstand down', false),
('fill up the tank', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-14', 'Halloween', 'Holidays', 'Describe "Halloween" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('trick or treat', false),
('costumes and candy', false),
('pumpkin carving', false),
('October thirty first', false),
('spooky season', false),
('haunted house', false),
('skeleton decorations', false),
('candy corn debate', false),
('doorbell all night', false),
('turkey and stuffing', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-15', 'Chess', 'Games', 'Describe "Chess" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('checkmate finish', false),
('queen is powerful', false),
('64 squares', false),
('knight moves L', false),
('castling trick', false),
('Queen''s Gambit show', false),
('grandmaster title', false),
('pawn promotion', false),
('en passant confusion', false),
('double sixes roll', true)
) as v(t, i);

with r as (insert into imp_rounds (play_date, secret, category, prompt) values ('2026-11-16', 'Cat', 'Animals', 'Describe "Cat" in up to 5 words without saying it.') on conflict (play_date) do update set secret=excluded.secret returning id)
insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values
('knocks things off', false),
('nine lives', false),
('purring loudly', false),
('ignores you completely', false),
('litter box duty', false),
('laser pointer chase', false),
('cardboard box lover', false),
('meows at 3am', false),
('judges silently', false),
('fetches the ball', true)
) as v(t, i);

