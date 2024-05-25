export interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
    user: User;
  }
  
  export interface User {
    id: string;
    nome?: string;
    cognome?: string;
    numero?: string;
    email: string;
    password: string;
    idcard?: string;
    passeggero?: Passeggero;
    idAutista?: number;
    autista?: Autista;
    feedback: Feedback[];
    session: Session[];
  }
  
  export interface Passeggero {
    idcard: string;
    prenotazioni: Prenotazioni[];
    user?: User;
  }
  
  export interface Autista {
    id: number;
    foto: string;
    numeroPatente: string;
    patente: Patente;
    prenotazioni: Prenotazioni[];
    veicolo: Veicolo[];
    viaggio: Viaggio[];
    user?: User;
  }
  
  export interface Patente {
    numero: string;
    scadenza: string;
    autista?: Autista;
  }
  
  export interface Veicolo {
    targa: string;
    produttore: string;
    posti: number;
    idAutista: number;
    autista?: Autista;
  }
  
  export interface Viaggio {
    id: number;
    Partenza: string;
    Destinazione: string;
    dataPartenza: string;
    contributo: number;
    tempoPercorrenza: string;
    postiDisponibili: number;
    prenotazioni: Prenotazioni[];
    idAutista: number;
    autista: Autista;
  }
  
  export interface Feedback {
    id: number;
    voto: number;
    commento: string;
    idUtente: string;
    user: User;
  }
  
  export interface Prenotazioni {
    id: number;
    stato: string;
    idPasseggero: string;
    passeggero: Passeggero;
    idViaggio: number;
    viaggio: Viaggio;
    idAutista: number;
    autista: Autista;
  }
  