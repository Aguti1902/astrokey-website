export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          language: string
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          language?: string
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          first_name?: string | null
          last_name?: string | null
          language?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
      }
      chart_results: {
        Row: {
          id: string
          user_id: string
          payment_intent_id: string
          test_answers: Record<string, unknown>
          chart_data: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          payment_intent_id: string
          test_answers: Record<string, unknown>
          chart_data: Record<string, unknown>
          created_at?: string
        }
        Update: {
          test_answers?: Record<string, unknown>
          chart_data?: Record<string, unknown>
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string
          stripe_subscription_id: string | null
          status: 'trialing' | 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete'
          trial_end: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id: string
          stripe_subscription_id?: string | null
          status: string
          trial_end?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          stripe_subscription_id?: string | null
          status?: string
          trial_end?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          updated_at?: string
        }
      }
    }
  }
}
