export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          role: string | null;
          school: string | null;
          grade: string | null;
          city: string | null;
          subject: string | null;
          position: string | null;
          child_grade: string | null;
          role_type: string | null;
          source_page: string | null;
          language: string | null;
          answers_json: Json | null;
          chosen_directions: string[] | null;
          exam_focus: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          role?: string | null;
          school?: string | null;
          grade?: string | null;
          city?: string | null;
          subject?: string | null;
          position?: string | null;
          child_grade?: string | null;
          role_type?: string | null;
          source_page?: string | null;
          language?: string | null;
          answers_json?: Json | null;
          chosen_directions?: string[] | null;
          exam_focus?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          role?: string | null;
          school?: string | null;
          grade?: string | null;
          city?: string | null;
          subject?: string | null;
          position?: string | null;
          child_grade?: string | null;
          role_type?: string | null;
          source_page?: string | null;
          language?: string | null;
          answers_json?: Json | null;
          chosen_directions?: string[] | null;
          exam_focus?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
};
