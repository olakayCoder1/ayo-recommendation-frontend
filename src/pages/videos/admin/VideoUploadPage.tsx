import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UploadFormData {
  title: string;
  description: string;
  channel: string;
  tags: string[];
  thumbnail: File | null;
  video: File | null;
}

const VideoUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    channel: '',
    tags: [],
    thumbnail: null,
    video: null,
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        if (name === 'thumbnail') {
          setThumbnailPreview(reader.result as string);
        } else if (name === 'video') {
          setVideoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
      });
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            alert('Video uploaded successfully!');
            navigate('/admin/videos');
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.channel || !formData.video || !formData.thumbnail) {
      alert('Please fill in all required fields and upload both video and thumbnail.');
      return;
    }
    
    // In a real application, you would send this data to your API
    console.log('Submitting video upload:', formData);
    simulateUpload();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Upload New Video</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Video Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                id="channel"
                name="channel"
                value={formData.channel}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                placeholder="Add a tag and press Enter"
                className="flex-grow p-2 border border-gray-300 rounded-l focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="p-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div 
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                id="video"
                name="video"
                ref={videoInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
              />
              
              {videoPreview ? (
                <div className="relative w-full pt-0 pb-0 h-0" style={{ paddingBottom: '56.25%' }}>
                  <video 
                    src={videoPreview} 
                    controls 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => triggerFileInput(videoInputRef)}
                    className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded text-sm hover:bg-indigo-600 absolute bottom-2 right-2"
                  >
                    Change Video
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => triggerFileInput(videoInputRef)}
                  className="cursor-pointer py-8"
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18M4 12h16M8 20h8" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Upload Video File *</p>
                  <p className="mt-1 text-xs text-gray-500">MP4, WebM or AVI</p>
                  <button
                    type="button"
                    className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded text-sm hover:bg-indigo-600"
                  >
                    Select File
                  </button>
                </div>
              )}
            </div>
            
            {/* Thumbnail Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                ref={thumbnailInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {thumbnailPreview ? (
                <div className="relative w-full pt-0 pb-0 h-0" style={{ paddingBottom: '56.25%' }}>
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => triggerFileInput(thumbnailInputRef)}
                    className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded text-sm hover:bg-indigo-600 absolute bottom-2 right-2"
                  >
                    Change Thumbnail
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => triggerFileInput(thumbnailInputRef)}
                  className="cursor-pointer py-8"
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Upload Thumbnail *</p>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF</p>
                  <button
                    type="button"
                    className="mt-2 bg-indigo-500 text-white py-1 px-3 rounded text-sm hover:bg-indigo-600"
                  >
                    Select File
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-indigo-700">Uploading...</span>
                <span className="text-sm font-medium text-indigo-700">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/video-list')}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isUploading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadPage;