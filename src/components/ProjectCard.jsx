import { MapPin, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { cn } from '../utils/cn';

export const ProjectCard = ({ project, onClick }) => {
  const statusColors = {
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    'Planning': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  };

  return (
    <Card 
      onClick={onClick}
      className="cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-primary-900/10 transition-all duration-300 hover:border-primary-500/40 dark:hover:border-primary-500/30 group hover:-translate-y-1"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.name}
          </CardTitle>
          <span className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap",
            statusColors[project.status]
          )}>
            {project.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        
        <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-slate-400" />
            <div className="flex-1 flex items-center gap-2">
              <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
              <span className="text-xs font-medium w-9">{project.progress}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
