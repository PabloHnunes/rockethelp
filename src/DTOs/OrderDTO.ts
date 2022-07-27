import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


export type OrderFirestoreDTO = { 
  patrimony: string;
  description: string;
  type: "all" | "problem" | "doubt" | "support"
  status: "open" | "closed"
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
}