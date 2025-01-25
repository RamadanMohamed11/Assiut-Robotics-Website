import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Zap, Laptop, Bot, Cpu, Eye, CircuitBoard } from 'lucide-react';

interface ScoreData {
  name: string;
  track: string;
  score: number;
  rank?: number;
  trackRank?: number;
}

const Score = () => {
  const [scores, setScores] = useState<ScoreData[]>([]);
  const [activeTrack, setActiveTrack] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tracks = [
    { id: 'all', name: 'All Tracks', icon: <Zap /> },
    { id: 'Hardware', name: 'Hardware', icon: <Laptop /> },
    { id: 'Vision', name: 'Computer Vision', icon: <Eye /> },
    { id: 'ROS', name: 'ROS', icon: <Bot /> },
    { id: 'Raspberry Pi', name: 'Raspberry Pi', icon: <Cpu /> },
    { id: 'Embedded', name: 'Embedded', icon: <CircuitBoard /> },
  ];

  const fetchData = async () => {
    try {
      // Add timestamp to URL to prevent caching
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/1TB8vtdLAdZnwQVKNDhWueD0GG6znEPkVpa2N5VwXjeY/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`
      );
      const text = await response.text();
      
      const rows = text.split('\n')
        .slice(1) // Skip header row
        .map(row => {
          const [name, score, track] = row.split(',').map(cell => cell.replace(/"/g, '').trim());
          return {
            name,
            score: Number(score),
            track
          };
        })
        .filter(item => item.name && !isNaN(item.score));

      // Calculate overall ranks
      const sortedScores = [...rows].sort((a, b) => b.score - a.score);
      const scoresWithRanks = sortedScores.map((score, index) => ({
        ...score,
        rank: index + 1
      }));

      // Calculate track-specific ranks
      const scoresWithTrackRanks = scoresWithRanks.map(score => {
        const trackScores = sortedScores.filter(s => s.track === score.track);
        const trackRank = trackScores.findIndex(s => s.name === score.name) + 1;
        return {
          ...score,
          trackRank
        };
      });

      setScores(scoresWithTrackRanks);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredScores = scores.filter(score => 
    activeTrack === 'all' || score.track === activeTrack
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400 animate-pulse-slow" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400 animate-pulse-slow" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600 animate-pulse-slow" />;
      default:
        return <span className="w-6 h-6 text-white/50">{rank}</span>;
    }
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-transparent border-l-4 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-500/20 to-transparent border-l-4 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-800/20 to-transparent border-l-4 border-amber-600';
      default:
        return 'bg-white/5 hover:bg-white/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Electrical Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="lightning-bolt absolute top-0 left-1/4 w-px h-32 bg-blue-400/50"></div>
        <div className="lightning-bolt absolute top-20 right-1/3 w-px h-48 bg-blue-400/50"></div>
        <div className="lightning-bolt absolute bottom-40 left-1/3 w-px h-24 bg-blue-400/50"></div>
        <div className="circuit-path absolute top-0 left-0 w-full h-full opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,50 Q50,50 100,50 T200,50 T300,50 T400,50"
              fill="none"
              stroke="currentColor"
              className="text-blue-400 path-animation"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Track Leaderboards
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full animate-glow"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTrack === track.id
                  ? 'bg-blue-500 text-white scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span className="w-5 h-5">{track.icon}</span>
              <span>{track.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl animate-fade-in">
          {filteredScores.map((score, index) => (
            <div
              key={`${score.name}-${score.track}-${index}`}
              className={`flex items-center justify-between p-4 border-b border-white/10 transition-all duration-300 ${getRowStyle(
                activeTrack === 'all' ? score.rank! : score.trackRank!
              )}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 flex justify-center">
                  {getRankIcon(activeTrack === 'all' ? score.rank! : score.trackRank!)}
                </div>
                <div>
                  <span className="text-white font-medium block">{score.name}</span>
                  <span className="text-blue-300 text-sm">{score.track}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-blue-400 power-pulse">
                  {score.score.toLocaleString()}
                </div>
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Score;