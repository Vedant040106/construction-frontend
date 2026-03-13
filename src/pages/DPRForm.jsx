import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';
import { mockProjects } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { cn } from '../utils/cn';

export const DPRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    projectId: id || '',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    description: '',
    workerCount: '',
  });

  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (photos.length + files.length > 3) {
      setErrors(prev => ({ ...prev, photos: 'Maximum 3 photos allowed' }));
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    if (errors.photos) setErrors(prev => ({ ...prev, photos: undefined }));
  };

  const removePhoto = (index) => {
    setPhotos(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectId) newErrors.projectId = 'Please select a project';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.weather) newErrors.weather = 'Please select weather conditions';
    if (!formData.description.trim()) newErrors.description = 'Work description is required';
    if (!formData.workerCount || formData.workerCount < 1) newErrors.workerCount = 'Valid worker count is required';
    if (photos.length === 0) newErrors.photos = 'Please upload at least 1 photo';
    if (photos.length > 3) newErrors.photos = 'Maximum 3 photos allowed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Navigate back after showing success toast
    setTimeout(() => {
      navigate('/projects');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <CheckCircle size={20} />
            <span className="font-medium">DPR Submitted Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/projects')}
        className="-ml-4 mb-6 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Daily Progress Report
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Submit today's work summary, conditions, and site photos.
        </p>
      </div>

      <Card className="glass-card shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none dark:text-slate-300">Project <span className="text-red-500">*</span></label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                className={cn(
                  "flex h-11 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:border-primary-500 dark:border-slate-800/80 dark:bg-slate-900/30 dark:text-slate-50 appearance-none input-focus-ring",
                  errors.projectId && "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500 dark:border-red-500/80 bg-red-50/50 dark:bg-red-500/5"
                )}
              >
                <option value="" disabled>Select a project</option>
                {mockProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.projectId && <p className="text-sm text-red-500">{errors.projectId}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={<span>Date <span className="text-red-500">*</span></span>}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                error={errors.date}
                max={new Date().toISOString().split('T')[0]}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none dark:text-slate-300">Weather <span className="text-red-500">*</span></label>
                <select
                  name="weather"
                  value={formData.weather}
                  onChange={handleInputChange}
                  className={cn(
                    "flex h-11 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:border-primary-500 dark:border-slate-800/80 dark:bg-slate-900/30 dark:text-slate-50 appearance-none input-focus-ring",
                    errors.weather && "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500 dark:border-red-500/80 bg-red-50/50 dark:bg-red-500/5"
                  )}
                >
                  <option value="" disabled>Select weather</option>
                  <option value="Sunny">Sunny ☀️</option>
                  <option value="Cloudy">Cloudy ☁️</option>
                  <option value="Rainy">Rainy 🌧️</option>
                </select>
                {errors.weather && <p className="text-sm text-red-500">{errors.weather}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none dark:text-slate-300">Work Description <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={cn(
                  "flex min-h-[140px] w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-3 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:border-primary-500 dark:border-slate-800/80 dark:bg-slate-900/30 dark:text-slate-50 resize-y input-focus-ring placeholder:text-slate-400",
                  errors.description && "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500 dark:border-red-500/80 bg-red-50/50 dark:bg-red-500/5"
                )}
                placeholder="Briefly describe the work completed today..."
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <Input
              label={<span>Total Workers on Site <span className="text-red-500">*</span></span>}
              type="number"
              name="workerCount"
              value={formData.workerCount}
              onChange={handleInputChange}
              error={errors.workerCount}
              min="1"
              placeholder="0"
            />

            <div className="space-y-3">
              <label className="text-sm font-medium leading-none dark:text-slate-300">Site Photos (1-3 images) <span className="text-red-500">*</span></label>
              
              <div 
                className={cn(
                  "border-2 border-dashed rounded-2xl p-10 text-center hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors cursor-pointer group bg-white/30 dark:bg-slate-900/20",
                  errors.photos ? "border-red-400 bg-red-50/50 dark:bg-red-950/20" : "border-slate-200 dark:border-slate-700/80 hover:border-primary-400/50 dark:hover:border-primary-500/50",
                  photos.length >= 3 && "opacity-50 pointer-events-none"
                )}
                onClick={() => photos.length < 3 && fileInputRef.current?.click()}
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  <Upload className="h-6 w-6 text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Click to upload photos</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">JPEG, PNG, JPG (Max 3)</p>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </div>
              {errors.photos && <p className="text-sm text-red-500">{errors.photos}</p>}

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <AnimatePresence>
                    {photos.map((photo, index) => (
                      <motion.div
                        key={photo.preview}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 group"
                      >
                        <img 
                          src={photo.preview} 
                          alt={`Preview ${index}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-6"
              isLoading={isSubmitting}
            >
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
