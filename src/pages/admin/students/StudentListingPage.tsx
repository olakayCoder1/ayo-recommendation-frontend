import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../../assets/images/thumbnail-im.jpg'

// Types
interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  department: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  gpa: number;
  courses: string[];
  advisor: {
    name: string;
    email: string;
    avatar: string;
  };
}

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmButtonClass: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, confirmText, cancelText, confirmButtonClass, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-md ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Student View Modal Component
const StudentViewModal: React.FC<{
  student: Student | null;
  closeModal: () => void;
  onStatusChange: (studentId: string, newStatus: 'Active' | 'Inactive') => void;
  onDeleteStudent: (studentId: string) => void;
}> = ({ student, closeModal, onStatusChange, onDeleteStudent }) => {
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!student) return null;

  const handleStatusChange = () => {
    const newStatus = student.status === 'Active' ? 'Inactive' : 'Active';
    onStatusChange(student.id, newStatus);
    setShowStatusConfirmation(false);
    closeModal();
  };

  const handleDeleteStudent = () => {
    onDeleteStudent(student.id);
    setShowDeleteConfirmation(false);
    closeModal();
  };

  const isActive = student.status === 'Active';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img 
                src={avatar} 
                alt={student.name} 
                className="h-48 w-48 rounded-full mx-auto object-cover" 
              />
              
              <div className="mt-4 text-center">
                <span className={`px-3 py-1 inline-flex text-sm font-medium rounded-full 
                  ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    student.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}
                >
                  {student.status}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium border-b pb-2 mb-4">Student Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{student.department}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="font-medium">{student.grade}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">GPA</p>
                  <p className="font-medium">{student.gpa.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>

              <h3 className="text-lg font-medium border-b pb-2 mt-6 mb-4">Advisor</h3>
              
              <div className="flex items-center">
                <img src={student.advisor.avatar} alt={student.advisor.name} className="h-10 w-10 rounded-full" />
                <div className="ml-4">
                  <p className="font-medium">{student.advisor.name}</p>
                  <p className="text-sm text-gray-500">{student.advisor.email}</p>
                </div>
              </div>

              <h3 className="text-lg font-medium border-b pb-2 mt-6 mb-4">Enrolled Courses</h3>
              
              <div className="flex flex-wrap gap-2">
                {student.courses.map(course => (
                  <span key={course} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            {/* <Link
              to={`/admin/student-edit/${student.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Edit Student
            </Link> */}
            <button
              onClick={() => setShowStatusConfirmation(true)}
              className={`px-4 py-2 text-white rounded-md ${
                isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isActive ? 'Disable Account' : 'Enable Account'}
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Status Change Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusConfirmation}
        title={isActive ? 'Disable Student Account' : 'Enable Student Account'}
        message={isActive 
          ? `Are you sure you want to disable ${student.name}'s account? They will no longer be able to access the system.`
          : `Are you sure you want to enable ${student.name}'s account? They will regain access to the system.`
        }
        confirmText={isActive ? 'Disable Account' : 'Enable Account'}
        cancelText="Cancel"
        confirmButtonClass={isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}
        onConfirm={handleStatusChange}
        onCancel={() => setShowStatusConfirmation(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Student Account"
        message={`Are you sure you want to permanently delete ${student.name}'s account? This action cannot be undone.`}
        confirmText="Delete Account"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleDeleteStudent}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
};

const StudentListingPage: React.FC = () => {
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Mock data - In a real application, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@university.edu',
          grade: 'Freshman',
          department: 'Computer Science',
          enrollmentDate: '2024-09-01T00:00:00Z',
          status: 'Active',
          gpa: 3.7,
          courses: ['Introduction to Programming', 'Calculus I', 'English Composition'],
          advisor: {
            name: 'Dr. Emily Chen',
            email: 'e.chen@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '2',
          name: 'Maria Rodriguez',
          email: 'maria.rodriguez@university.edu',
          grade: 'Junior',
          department: 'Biology',
          enrollmentDate: '2022-09-01T00:00:00Z',
          status: 'Active',
          gpa: 3.9,
          courses: ['Molecular Biology', 'Organic Chemistry', 'Statistics'],
          advisor: {
            name: 'Dr. James Wilson',
            email: 'j.wilson@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '3',
          name: 'David Johnson',
          email: 'david.johnson@university.edu',
          grade: 'Senior',
          department: 'Business Administration',
          enrollmentDate: '2021-09-01T00:00:00Z',
          status: 'On Leave',
          gpa: 3.2,
          courses: ['Business Ethics', 'Finance', 'Marketing Strategy'],
          advisor: {
            name: 'Dr. Sarah Thompson',
            email: 's.thompson@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '4',
          name: 'Priya Patel',
          email: 'priya.patel@university.edu',
          grade: 'Sophomore',
          department: 'Engineering',
          enrollmentDate: '2023-09-01T00:00:00Z',
          status: 'Active',
          gpa: 3.8,
          courses: ['Physics II', 'Calculus III', 'Engineering Principles'],
          advisor: {
            name: 'Dr. Robert Brown',
            email: 'r.brown@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '5',
          name: 'Thomas Lee',
          email: 'thomas.lee@university.edu',
          grade: 'Freshman',
          department: 'Psychology',
          enrollmentDate: '2024-09-01T00:00:00Z',
          status: 'Active',
          gpa: 3.5,
          courses: ['Introduction to Psychology', 'Biology', 'Statistics'],
          advisor: {
            name: 'Dr. Lisa Garcia',
            email: 'l.garcia@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '6',
          name: 'Sophia Williams',
          email: 'sophia.williams@university.edu',
          grade: 'Junior',
          department: 'Computer Science',
          enrollmentDate: '2022-09-01T00:00:00Z',
          status: 'Inactive',
          gpa: 3.1,
          courses: ['Data Structures', 'Artificial Intelligence', 'Computer Networks'],
          advisor: {
            name: 'Dr. Emily Chen',
            email: 'e.chen@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '7',
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@university.edu',
          grade: 'Senior',
          department: 'History',
          enrollmentDate: '2021-09-01T00:00:00Z',
          status: 'Active',
          gpa: 3.6,
          courses: ['Modern World History', 'European History', 'Research Methods'],
          advisor: {
            name: 'Dr. Michael Davis',
            email: 'm.davis@university.edu',
            avatar: avatar,
          }
        },
        {
          id: '8',
          name: 'Emma Clark',
          email: 'emma.clark@university.edu',
          grade: 'Sophomore',
          department: 'Art & Design',
          enrollmentDate: '2023-09-01T00:00:00Z',
          status: 'On Leave',
          gpa: 3.9,
          courses: ['Drawing Fundamentals', 'Art History', 'Digital Design'],
          advisor: {
            name: 'Dr. Jessica Martin',
            email: 'j.martin@university.edu',
            avatar: avatar,
          }
        },
      ];

      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);

      // Extract all unique courses
      const allCourses = Array.from(
        new Set(
          mockStudents.flatMap(student => student.courses)
        )
      );
      setAvailableCourses(allCourses);

      // Extract all unique departments
      const allDepartments = Array.from(
        new Set(
          mockStudents.map(student => student.department)
        )
      );
      setAvailableDepartments(allDepartments);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = students;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(term) || 
        student.email.toLowerCase().includes(term) ||
        student.department.toLowerCase().includes(term)
      );
    }

    // Apply grade filter
    if (gradeFilter) {
      result = result.filter(student => student.grade === gradeFilter);
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter(student => student.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter) {
      result = result.filter(student => student.department === departmentFilter);
    }

    // Apply course filters
    if (selectedCourses.length > 0) {
      result = result.filter(student => 
        selectedCourses.some(course => student.courses.includes(course))
      );
    }

    setFilteredStudents(result);
  }, [students, searchTerm, gradeFilter, statusFilter, departmentFilter, selectedCourses]);

  // Handle course selection
  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course)
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setGradeFilter('');
    setStatusFilter('');
    setDepartmentFilter('');
    setSelectedCourses([]);
  };

  // Handle student status change
  const handleStatusChange = (studentId: string, newStatus: 'Active' | 'Inactive') => {
    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, status: newStatus } 
        : student
    );
    
    setStudents(updatedStudents);
    // In a real app, you would make an API call here to update the student's status
    console.log(`Student ${studentId} status changed to ${newStatus}`);
  };

  // Handle student deletion
  const handleDeleteStudent = (studentId: string) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    
    setStudents(updatedStudents);
    // In a real app, you would make an API call here to delete the student
    console.log(`Student ${studentId} deleted`);
  };

  // Open student view modal
  const openStudentView = (student: Student) => {
    setViewingStudent(student);
  };

  // Close student view modal
  const closeStudentView = () => {
    setViewingStudent(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Student Directory</h1>
          <p className="text-gray-600 mt-1">Browse and filter student records</p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* <Link 
            to="/admin/student-add" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add New Student
          </Link> */}
        </div>
      </div>

      {/* Filters section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email, or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              id="grade"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Grades</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Departments</option>
              {availableDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Courses
          </label>
          <div className="flex flex-wrap gap-2">
            {availableCourses.map(course => (
              <button
                key={course}
                onClick={() => toggleCourse(course)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCourses.includes(course)
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Students listing */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No students found</h3>
          <p className="text-gray-500">Try adjusting your filter criteria or add a new student.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    GPA
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Enrollment
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                          <div className="mt-1 flex flex-wrap gap-1 sm:hidden">
                            {student.courses.slice(0, 1).map(course => (
                              <span key={course} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                {course}
                              </span>
                            ))}
                            {student.courses.length > 1 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                +{student.courses.length - 1}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{student.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{student.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {student.gpa.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          student.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {formatDate(student.enrollmentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openStudentView(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        View
                      </button>
                      {/* <Link
                        to={`/admin/student-edit/${student.id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student View Modal with Account Management */}
      {viewingStudent && (
        <StudentViewModal 
          student={viewingStudent} 
          closeModal={closeStudentView}
          onStatusChange={handleStatusChange}
          onDeleteStudent={handleDeleteStudent}
        />
      )}
    </div>
  );
};

export default StudentListingPage;