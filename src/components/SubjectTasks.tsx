import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Clock } from 'lucide-react';

interface Task {
  taskNumber: number;
  link: string;
  deadline?: string;
  isOverdue?: boolean;
}

interface TasksData {
  [subject: string]: Task[];
}

const SubjectTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject } = location.state || {};
  const [tasks, setTasks] = useState<TasksData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string>('');

  const SUBMISSION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSczLC-jlXYHihR6eJEBAf-I3T5DD6clXWo9SaCYbmbxxppavQ/viewform?usp=header';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/1vdrkNXx97kJ8FOeXobKEty2P5iRlStifb00Y4qMsWCs/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`
        );
        const text = await response.text();
        
        const rows = text.split('\n')
          .slice(1)
          .map(row => {
            const [subjectName, taskNumber, link, deadline] = row.split(',').map(cell => cell.replace(/"/g, '').trim());
            
            const deadlineDate = deadline ? new Date(deadline) : null;
            const isOverdue = deadlineDate ? deadlineDate < new Date() : false;
            
            return {
              subject: subjectName,
              taskNumber: Number(taskNumber),
              link,
              ...(deadline ? { deadline, isOverdue } : {})
            };
          });

        const subjectAliases = {
          'python programming': ['python programming', 'python', 'python lang', 'python language'],
          'c programming': ['c programming', 'c lang', 'c language'],
          'electronics': ['electronics', 'electronic'],
          'digital electronics': ['digital electronics', 'digital'],
          'pcb design': ['pcb design', 'pcb'],
          'arduino': ['arduino', 'arduino programming'],
          'embedded system (avr)': ['embedded system (avr)', 'avr', 'embedded avr'],
          'devices': ['devices', 'hardware devices'],
          'computer vision': ['computer vision', 'vision', 'cv'],
          'ros2': ['ros2', 'ros', 'robot operating system'],
          'raspberry': ['raspberry', 'raspberry pi', 'raspi'],
          'hardware': ['hardware', 'electronics hardware'],
          'linux commands': ['linux commands', 'linux', 'bash'],
          'circuits': ['circuits', 'circuit']
        };

        const normalizeSubjectName = (name: string): string => {
          const lowerName = name.toLowerCase().trim();
          
          for (const [key, aliases] of Object.entries(subjectAliases)) {
            if (aliases.includes(lowerName)) {
              return key;
            }
          }
          
          return lowerName;
        };

        const groupedTasks = rows.reduce((acc, row) => {
          const normalizedSubject = normalizeSubjectName(row.subject);
          if (!acc[normalizedSubject]) {
            acc[normalizedSubject] = [];
          }
          
          const existingTask = acc[normalizedSubject].find(t => t.taskNumber === row.taskNumber);
          if (!existingTask) {
            acc[normalizedSubject].push({
              taskNumber: row.taskNumber,
              link: row.link,
              ...(row.deadline ? { deadline: row.deadline, isOverdue: row.isOverdue } : {})
            });
          }
          
          return acc;
        }, {} as TasksData);

        Object.keys(groupedTasks).forEach(subject => {
          groupedTasks[subject].sort((a, b) => a.taskNumber - b.taskNumber);
        });

        const debugInfo = `Available subjects: ${Object.keys(groupedTasks).join(', ')}`;
        setDebug(debugInfo);

        setTasks(groupedTasks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();

    if (diff < 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Less than an hour left';
  };

  if (!subject) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  const currentSubject = subject.title.toLowerCase().trim();
  const subjectTasks = tasks[currentSubject] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-16 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white mb-8 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Track</span>
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl font-bold text-white mb-4">{subject.title}</h1>
          <p className="text-blue-200 text-lg">{subject.description}</p>
          <p className="text-xs text-gray-400 mt-4">{debug}</p>
        </div>

        <div className="space-y-6">
          {subjectTasks.length > 0 ? (
            subjectTasks.map((task, index) => (
              <div
                key={task.taskNumber}
                onClick={() => window.open(task.link, '_blank')}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 animate-slide-in cursor-pointer group ${
                  task.deadline
                    ? task.isOverdue 
                      ? 'border-red-400/50 hover:border-red-400' 
                      : 'border-white/10 hover:border-blue-400/50'
                    : 'border-white/10 hover:border-blue-400/50'
                }`}
                style={{ animationDelay: `${(index + 2) * 0.2}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Task {task.taskNumber}
                    </h3>
                    <p className="text-blue-200">Complete the task requirements and submit your solution</p>
                    
                    {task.deadline && (
                      <div className="flex items-center mt-3 space-x-2">
                        <Clock size={16} className={task.isOverdue ? 'text-red-400' : 'text-blue-400'} />
                        <span className={`text-sm ${task.isOverdue ? 'text-red-400' : 'text-blue-400'}`}>
                          {formatDeadline(task.deadline)}
                        </span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          task.isOverdue 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {getTimeRemaining(task.deadline)}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300">
                    Task {task.taskNumber}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-blue-200">
                    Click to view task details
                  </div>
                  <a
                    href={SUBMISSION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Send size={18} className="animate-pulse-slow" />
                    <span>Submit Solution</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white py-8">
              No tasks available for this subject yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectTasks;