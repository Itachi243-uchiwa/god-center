import { createClient } from '@supabase/supabase-js'

// ⚠️  Remplacez ces valeurs par celles de votre projet Supabase
const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL     || 'https://VOTRE_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'VOTRE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function saveScore(playerName, gameMode, score) {
    try {
        const { error } = await supabase
            .from('leaderboard')
            .insert([{ player_name: playerName, game_mode: gameMode, score, played_at: new Date().toISOString() }])
        if (error) throw error
    } catch (e) {
        console.warn('Supabase: score non sauvegardé —', e.message)
    }
}

export async function getLeaderboard(gameMode, limit = 10) {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('*')
            .eq('game_mode', gameMode)
            .order('score', { ascending: false })
            .limit(limit)
        if (error) throw error
        return data ?? []
    } catch (e) {
        console.warn('Supabase: leaderboard indisponible —', e.message)
        return []
    }
}