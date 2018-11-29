import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  citation;
  citations = [
    {quote: 'Un grand pouvoir implique de grandes responsabilités.', author: 'Ben Parker, Spiderman'},
    {quote: 'Ton père il est.', author: 'Yoda, Star Wars'},
    {quote: 'Bravo mais attrape pas la grosse tête ptit gars !', author: 'Han Solo, Star Wars'},
    {quote: 'Pour Frodon.', author: 'Aragorn fils d\'Arathorn, The Lord of the ring'},
    {quote: 'He peed on my rug !', author: 'Jeffrey Lebowski, The big Lebowski'},
    {quote: 'Smokey my friend, you\'re entering a world of pain.', author: 'Walter Sobchak, The big Lebowski'},
    {quote: 'OVER THE LINE !', author: 'Truls, Le roi du Curling'},
    {quote: 'Ou ou ou vous pouvez nous le mimer.', author: 'Steven, La classe américaine'},
    {quote: 'Kalasnikov !', author: 'Goran Bregovic'},
    {quote: 'Saïgon...', author: 'Captain Willard, Apocalyspe now'},
    {quote: 'Pose ce cahier d\'exercices isométriques.', author: 'Peter, La classe américaine'},
    {quote: 'I\'m Batman !', author: 'Bruce Wayne, Batman'},
    {quote: 'Oh que j\'suis sotte c\'est du suédois.', author: 'Odile Deray, La cité de la peur'},
    {quote: 'Batte en l\'air !', author: 'Martin, L\'Arme fatale'},
    {quote: 'Disons que j\'ai un bon pedigree.', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Heinrich ! Un Postisch ?!', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Je couds.', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Le mambo !', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Et quel calibre !', author: 'Vincent'},
    {quote: 'C\'est tout moi ça.', author: 'Vincent'},
    {quote: 'En tout cas, on peut dire que le soviet éponge.', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Tu vois Hubert, c\'est peut-être ça aussi, changer le monde.', author: 'Heinrich'},
    {quote: 'C\'est un cadeau, de noël.', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Et le Rohan répondra !', author: 'Theoden du Rohan, Le Seigneur des anneaux: Le Retour du roi.'},
    {quote: 'Je ne peux le porter pour vous, mais je peux vous porter vous !', author: 'Sam à Frodon, Le Seigneur des anneaux: Le Retour du roi.'},
    {quote: 'Attention Bill, derrière toi un chinois !', author: 'Hubert Bonisseur De la Batte, OSS117'},
    {quote: 'Je veux mes chevaux.', author: 'Michael Kohlhaas'},
    {quote: 'Wanna fight ?', author: 'Julian, Only God Forgives'},
    {quote: 'You fucked my wife ?', author: 'Jake Lamotta, Raging Bull'},
    {quote: 'I am the danger !', author: 'Walter White, Breaking Bad'},
    {quote: 'Meurs, pourriture communiste !', author: 'Simon Jérémi, La cité de la peur.'},
    {quote: 'C\'est quoi ce bazar ? Le maroille il est foutu !', author: 'Mr. poulpe, Golden Moustache : Les cht\'is à Shanguaï'},
    {quote: 'The Lannisters send their regards', author: 'Roose Bolton, Game of Thrones'},
    {quote: 'Une seule, pourquoi moi ?', author: 'Corben Dallas, Le 5ème élément.'},
    {quote: 'No god no !', author: 'Brick Tamland, Anchorman'},
    {quote: 'Winter is coming', author: 'Ned Stark, Game of thrones'},
    {quote: 'You put the pussy on the chainwax !', author: 'Key, Key & Peele'},
    {quote: 'Non, il y en a un autre.', author: 'Yoda, Star Wars'},
    {quote: 'Évite celle la.', author: 'Trinity, Matrix'},
    {quote: 'Ben, Ben Kenobi ?', author: 'Luke Skywalker, Star Wars'},
    {quote: 'Je vous en prie Obi-wan Kenobi, vous êtes notre seul espoir.', author: 'Princesse Leïa, Star Wars'},
    {quote: 'Soylent green is people !', author: 'Detective Thorn, Soylent Green'},
    {quote: 'Eeeeeeeehhhh ! Ces anglais !', author: 'Le vieux, Cloud Atlas'},
    {quote: 'Freeeeeedoooooooooooooooommm !', author: 'William Walles, Braveheart'},
    {quote: 'Je vois tout venir.', author: 'Orson Welles, La classe américaine'},
    {quote: 'Rosebud.', author: ' Charles Foster Kane, Citizen Kane'},
    {quote: 'Philippe ! Je sais où tu te cache !', author: 'Mike, Hitman le Cobra'},
    {quote: 'I\'m Arthur, king of the britons !', author: 'Le Roi Arthur, Monty Python and the Holy Grail'},
    {quote: 'C\'est une vraie boucherie.', author: 'L\'assistant du commissaire Biales, La cité de la peur.'},
    {quote: 'Un jour je serai le meilleur dresseur !', author: 'Sacha, Pokémon'},
    {quote: 'Quelle noblesse de la part de cet animal.', author: 'Batman'},
    {quote: 'Ne vous ai-je pas assez diverti ?', author: 'Maximus, Gladiator'},
    {quote: 'L\'espagnol, l\'espagnol, l\'espagnol !', author: 'Le peuple romain, Gladiator'},
    {quote: 'Have you met Howard ?', author: 'Forest Bondurant, Lawless'},
    {quote: 'I thought I walked.', author: 'Forest Bondurant, Lawless'},
    {quote: 'English, motherfucker, do you speak it ?', author: 'Jules Winnfield, Pulpe Fiction'},
    {quote: 'Hum hum, hum hum hum...', author: 'Clark Gable, La classe américaine'},
    {quote: 'Eh Paul !', author: 'Patrick Bateman, Américain Psycho'},
    {quote: 'It\'s Bone.', author: 'Patrick Bateman, Américain Psycho'},
    {quote: 'I chose Silian rail.', author: 'Patrick Bateman, Américain Psycho'},
    {quote: '88 miles à l\'heure !', author: 'Doc, Retour vers le futur'},
    {quote: 'T\'as les foies ?', author: 'Biff tannen, retour vers le futur'},
    {quote: 'Quand faut y aller...', author: 'Ian Malcom, Jurassic Park'},
    {quote: 'Vous avez créé des raptors ?', author: 'Robert Muldoon, Jurassic Park'},
    {quote: 'Petite futée.', author: 'Robert Muldoon, Jurassic Park'},
    {quote: 'Ils leur donne à manger.', author: 'John Hammond, Jurassic Park'},
    {quote: 'Monsieur Arnold ?', author: 'Ellie Sattler, Jurassic Park'},
    {quote: 'Fuck you Montgomery Brogan.', author: 'Montgomery Brogan, la 25ème heure'},
    {quote: 'Tout est super génial !', author: 'Lego : La grande aventure'},
    {quote: 'Ground control to Major Tom...', author: 'David Bowie, Space Oddity'},
    {quote: 'Call me Dirk Diggler.', author: 'Dirk Diggler, Boogie nights'},
    {quote: 'I\'m hot ! I\'m big !', author: 'Daniel Lugo, Pain & gain'},
    {quote: 'Dans une bonne auberge.', author: 'James Stewart, La classe américaine'},
    {quote: 'What the fuck does WTF mean ?', author: 'Gary King, The world\'s end '},
    {quote: 'Les nains de cavenain.', author: 'Gandalf, The lord of the ring'},
    {quote: 'Des crébins du pays de Dain.', author: 'Legolas, The lord of the ring'},
    {quote: 'I\'m gonna tell you what Like A Virgin is about !', author: 'Mr. Brown, Reservoir Dogs'},
    {quote: 'I don\'t tip', author: 'Mr. Pink, Reservoir Dogs'},
    {quote: 'Le cor du Gondor !', author: 'Legolas, The lord of the ring'},
    {quote: 'Skeen !!', author: 'Le roi du curling'},
    {quote: 'Jamais bière n\'aura si bon goût que celle que l\'on trouve par chez nous !', author: 'Merry et Pippin, The lord of the ring '},
    {quote: 'The cake is a lie.', author: 'Portal'},
    {quote: 'Toi, tu creuses.', author: 'Blondin, Le bon la brute et le truant'},
    {quote: 'Burn down their house... With lemons.', author: 'Portal'},
    {quote: 'Shut the fuck up Donnie.', author: 'Walter Sobchak, The big Lebowski'},
    {quote: 'His name is Biggus Dickus.', author: 'Cesar, La vie de Brian'},
    {quote: 'Vazy Chewie envoie la gomme !', author: 'Han Solo, Star wars'},
    {quote: 'Un pour l\'argent, deux pour le spectacle et trois, pour le caillou.', author: 'Elvis Presley, La classe americaine'},
    {quote: 'Nobody fuck with the Jesus.', author: 'Jesus, The big Lebowski'},
    {quote: 'Et mamie tromblon, elle s\'est déjà fait tromblonner ?', author: 'Ben, C\'est arrivé près de chez vous'},
    {quote: 'This is no country for old men.', author: 'Sheriff Ed Tom Bell, No country for old men'},
    {quote: 'Life is full of beautiful things.', author: ''},
    {quote: 'You talking to me ?', author: 'Travis Bickle, Taxi Driver'},
    {quote: 'Go fuck yourself San Diego', author: 'Ron Burgundy, Anchorman'},
    {quote: 'I love lamp.', author: 'Brick Tamland, Anchorman'},
    {quote: 'Mr Grady, you were the caretaker.', author: 'Jack Torrance, The Shining'},
    {quote: 'Words of wisdom Lloyd, words of wisdom.', author: 'Jack Torrance, The Shining'},
    {quote: 'Here\'s Johnny !', author: 'Jack Torrance, The Shining'},
    {quote: 'If I was a lion and you were a tuna...', author: 'Terry Hoitz, The other guys'},
    {quote: 'Non ! Ne bouge pas ! Souviens toi, la partie n\'est pas finie.', author: 'Harry Potter, Harry Potter à l\'école des sorciers'},
    {quote: 'We can\'t stop here, this is bat country', author: 'Raoul Duke, Fear and loathing in Las Vegas'},
    {quote: 'Big dick player', author: 'Les Grosman, Tropic Thunder'},
    {quote: 'I\'m gonna make him an offer he can\'t refuse', author: 'Vito Corleone, The Godfather'},
    {quote: 'Drop the gun, take the cannellonis', author: 'Peter Clemenza, The Godfather'},
    {quote: 'Rule n°1 : Cardio', author: 'Colombus, Zombieland'},
    {quote: 'Where are the fucking Twinkies ?', author: 'Tallahassee, Zombieland'},
    {quote: 'Ce n\'est pas une grotte.', author: 'Leïa Organa, L\'empire contre attaque'},
    {quote: 'Je suis ton père.', author: 'Dark Vador, L\'empire contre attaque'},
    {quote: 'Noooooooooooooooooooonnn !', author: 'Luke Skywalker, L\'empire contre attaque'},
    {quote: 'C\'est le jour de la marmotte.', author: 'Un jour sans fin'},
    {quote: 'Yeah bitch ! Magnets !', author: 'Jesse Pinkman, Breaking Bad'},
    {quote: 'Jusqu\'ici tout va bien.', author: ''},
    {quote: 'C\'est pas la chute qui compte, c\'est l\'atterissage.', author: 'Hubert Koundé, La Haine'},
    {quote: 'Ne suis-je pas d\'une grande clémence ?!', author: 'Comode, Gladiator'},
    {quote: 'Donne le nous Deagol mon cher.', author: 'Smeagol, Le seigneur des anneaux'},
    {quote: 'Parce que c\'est mon anniversaire et que je le veux.', author: 'Smeagol, Le seigneur des anneaux'},
    {quote: 'Welcome to the enrichment center.', author: 'GLaDOS, Portal'},
    {quote: 'Les nains ont creusé trop profond et avec trop d\'avidité.', author: 'Saruman, Le seigneur des anneaux'},
    {quote: 'Mon p\'tit guide médical !', author: 'Pulp fiction'},
    {quote: 'You know nothing Jon Snow.', author: 'Ygritte, Game of Thrones'},
  ];
  days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  date: string;
  time: string;

  constructor() {
  }


  ngOnInit() {
    this.citation = this.rdmQuotes();
    setInterval(() => {
      this.display();
    } , 20000);

    this.startDate();
    this.startTime();
  }

  display() {
    this.citation = this.rdmQuotes();
  }

  rdmQuotes() {
    const rdm = Math.floor(Math.random() * this.citations.length);

    return this.citations[rdm];
  }

  startTime() {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    const s = today.getSeconds();
    const ampm = '';
    m = this.checkTime(m);
    this.time = h + ':' + m + ampm;

    const t = setTimeout(() => {
      this.startTime();
    }, 1000);
  }

  checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }


  startDate() {
    const d = new Date();
    this.date = this.days[d.getDay()] + ' | ' + [d.getMonth() + 1] + '/' + d.getDate() + '/' + d.getFullYear();
  }




}






