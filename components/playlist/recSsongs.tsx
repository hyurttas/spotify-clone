'use client'
import React, {useEffect, useState} from 'react'
import RecSongs from "@/components/playlist/recSongs";

interface Artist {
    name: string;
}

interface Song {
    id: string;
    title: string;
    artistId: string;
    createdAt: Date;
    fileUrl: string;
    duration: string;
    image: string | null;
    artist: Artist;
}

interface RecSongItemProps {
    id: string;
    name: string;
    image: string;
    artist: string;
}

interface RecsSongsProps {
    playlistId: string;  // Changed from pId to playlistId for clarity
}

type Songs = Song[];


const RecSongContainer: React.FC<RecsSongsProps> = ({playlistId}) => {
    const [songs, setSongs] = useState<Songs>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchSongs = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch('/api/getRandom')

            if (!response.ok) {
                throw new Error('Failed to fetch songs')
            }

            const data: Songs = await response.json()
            setSongs(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Error fetching songs:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSongs()
    }, [])

    if (error) {
        return (
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-red-500">Error loading songs: {error}</p>
                <button
                    onClick={fetchSongs}
                    className="text-neutral-400 hover:text-white transition"
                >
                    Try again
                </button>
            </div>
        )
    }

    return (
        <div className="flex px-4 mt-6 flex-col gap-y-4">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <p className="text-neutral-400">Loading songs...</p>
                </div>
            ) : (
                <>
                    {songs.map((song) => (
                        <RecSongs
                            playlisId={playlistId}
                            key={song.id}
                            id={song.id}
                            name={song.title}
                            image={song.image || '/img/profile.png'}
                            artist={song.artist.name}
                        />
                    ))}
                    <button
                        onClick={fetchSongs}
                        disabled={isLoading}
                        className="text-neutral-400 hover:text-white transition disabled:opacity-50 self-end px-4 py-2"
                    >
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </>
            )}
        </div>
    )
}

export default RecSongContainer