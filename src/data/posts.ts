export interface Post {
  slug: string
  title: string
  date: string
  readTime: string
  tag: string
  excerpt: string
  content: string // HTML string
}

export const posts: Post[] = [
  {
    slug: 'perche-il-design-conta',
    title: 'perché il design conta (anche se sei solo uno sviluppatore)',
    date: '2026-07-03',
    readTime: '4 min',
    tag: 'design',
    excerpt:
      'Il codice che funziona è il minimo indispensabile. Il codice che funziona e che è bello da usare è quello che le persone ricordano.',
    content: `
<p>Ho iniziato a programmare senza preoccuparmi minimamente dell'estetica. L'importante era che funzionasse. Poi ho capito che quella mentalità mi stava limitando.</p>

<h2>il minimo indispensabile non basta</h2>
<p>Un form che funziona e un form che <em>sembra</em> funzionare bene sono due cose completamente diverse agli occhi di chi lo usa. L'utente non legge il codice. Legge i pixel, le animazioni, i tempi di risposta.</p>
<p>La prima impressione si forma nei primi 50 millisecondi. Non c'è nessun backend abbastanza veloce da recuperare un'interfaccia brutta.</p>

<h2>il design non è decorazione</h2>
<p>Molti sviluppatori pensano al design come a uno strato di vernice applicato sopra al codice vero. È il contrario: il design è la traduzione visiva di decisioni funzionali. Ogni margine, ogni colore, ogni animazione comunica qualcosa all'utente.</p>
<p>Un bottone con un hover state dice: <em>sono cliccabile</em>. Un loading spinner dice: <em>sto lavorando, aspetta</em>. Un messaggio di errore rosso dice: <em>qualcosa è andato storto</em>. Ogni scelta visiva è una scelta di comunicazione.</p>

<h2>cosa ho imparato</h2>
<p>Studiare i principi base del design — gerarchia visiva, tipografia, spazio negativo, colore — ha reso il mio codice migliore. Non perché sia più bello, ma perché sono diventato più bravo a pensare dal punto di vista di chi usa quello che costruisco.</p>
<p>Se sei uno sviluppatore e non hai mai aperto Figma o letto un articolo di design, ti stai perdendo una prospettiva fondamentale sul tuo stesso lavoro.</p>
    `,
  },
  {
    slug: 'costruire-nimbuscloud',
    title: 'costruire nimbuscloud: cosa ho imparato sbagliando',
    date: '2026-06-20',
    readTime: '6 min',
    tag: 'progetto',
    excerpt:
      'NimbusCloud è il progetto più ambizioso che ho costruito. Ecco gli errori che ho fatto e cosa mi hanno insegnato.',
    content: `
<p>NimbusCloud è iniziato come un esercizio di autenticazione JWT. È finito con un sistema di storage cloud completo con piani di abbonamento, Docker, PostgreSQL e un frontend React.</p>

<h2>l'errore più grande: pianificare troppo poco</h2>
<p>Ho iniziato a scrivere codice il primo giorno senza aver progettato lo schema del database. Ho dovuto riscrivere le migration tre volte. La prossima volta dedicherò almeno un giorno intero alla progettazione prima di toccare la tastiera.</p>

<h2>docker mi ha salvato (e quasi distrutto)</h2>
<p>Containerizzare l'applicazione fin dall'inizio è stata la decisione migliore. "Funziona sulla mia macchina" non è mai stato un problema. Ma capire come far comunicare i container tra di loro, gestire i volumi per il database e i file caricati, ha richiesto giorni di debugging.</p>
<p>La documentazione di Docker è ottima. Ma non sostituisce il capire cosa sta succedendo sotto il cofano.</p>

<h2>il backend è la parte facile</h2>
<p>Sembra controintuitivo, ma per me il backend Express con Prisma è stato molto più semplice del frontend. Le API sono deterministiche: una richiesta entra, una risposta esce. Il frontend invece deve gestire stato, animazioni, responsive design, accessibilità, tutto contemporaneamente.</p>

<h2>cosa farei diversamente</h2>
<ul>
  <li>Inizierei con i test (almeno per le API critiche)</li>
  <li>Progetterei lo schema DB su carta prima di scrivere codice</li>
  <li>Userei TypeScript anche nel backend fin dall'inizio</li>
  <li>Documenterei le decisioni architetturali mentre le prendo</li>
</ul>
<p>Ogni progetto è una lista di errori da non rifare. NimbusCloud è stata la lista più lunga e più utile che ho mai fatto.</p>
    `,
  },
  {
    slug: 'terminal-come-ui',
    title: 'il terminale come interfaccia utente',
    date: '2026-06-10',
    readTime: '3 min',
    tag: 'ux',
    excerpt:
      'Ho aggiunto un terminale interattivo al mio portfolio. Non per utilità, ma per dimostrare che un\'interfaccia può essere anche un gioco.',
    content: `
<p>Il terminale è l'interfaccia più vecchia e più potente che esiste. Nessuna GUI ha mai raggiunto l'efficienza di una buona CLI per chi sa usarla. Eppure lo consideriamo un'interfaccia per soli esperti.</p>

<h2>perché ho inserito un terminale nel portfolio</h2>
<p>Non per utilità. Chiunque visiti il mio portfolio non ha bisogno di digitare comandi per scoprire chi sono. C'è il testo, le sezioni, le immagini. Il terminale è lì per qualcos'altro: per creare un momento di sorpresa e interazione.</p>
<p>Quando un visitatore clicca sul terminale e digita <code>help</code>, l'esperienza cambia. Non sta più leggendo: sta esplorando. Questo è il tipo di memoria che vuoi lasciare.</p>

<h2>il terminale come metafora</h2>
<p>Un portfolio è un documento statico. Un terminale è un dialogo. Aggiungere un'interfaccia conversazionale a qualcosa di tradizionalmente passivo dice qualcosa di preciso su come penso al design: l'utente non è uno spettatore, è un partecipante.</p>

<h2>la lezione</h2>
<p>Non ogni elemento di un'interfaccia deve essere funzionale in senso stretto. Alcuni elementi esistono per creare un momento, un ricordo, un sorriso. Il design che non si prende mai troppo sul serio è il design più umano.</p>
    `,
  },
]
