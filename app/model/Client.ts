import mongoose, { Schema, Document } from 'mongoose';

interface Carte {
  nomLieu: string;
  prix: string;
  metresCarres: string;
  localisation: string;
  siteUrl: string;
  visite: boolean;
  note: number;
  noteLibre: string;
  imageUrls: string[];
  createdAt: Date;
}

export interface ClientDocument extends Document {
  nom: string;
  email: string;
  password: string;
  cartes: Carte[];
}

const CarteSchema = new Schema<Carte>({
  nomLieu: String,
  prix: String,
  metresCarres: String,
  localisation: String,
  siteUrl: String,
  visite: Boolean,
  note: Number,
  noteLibre: String,
  imageUrls: [String],
  createdAt: { type: Date, default: Date.now },
});

const ClientSchema = new Schema<ClientDocument>({
  nom: String,
  email: { type: String, unique: true },
  password: String,
  cartes: [CarteSchema],
});

export default mongoose.models.Client || mongoose.model<ClientDocument>('Client', ClientSchema);
