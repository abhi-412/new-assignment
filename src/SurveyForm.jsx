import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomInput from './CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SurveyForm = () => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const newErrors = {};
  const [errors, setErrors] = useState(newErrors);

  const fetchAdditionalQuestions = async (topic) => {
    const categoryMap = {
      'Technology': 18, // Computers
      'Health': 17, // Science & Nature
      'Education': 9 // General Knowledge
    };

    const categoryId = categoryMap[topic];
    if (!categoryId) {
      return;
    }

    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`);
      const questions = response.data.results.map((result) => result.question);
      console.log(response);

      setAdditionalQuestions(questions.map((question, index) => ({
        label: question,
        type: 'text',
        name: `additionalQuestion${index}`
      })));
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };
  
  const [surveyData, setSurveyData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    feedback: '',
  });

  const validateFields = () => {
    
    if (formik.values.surveyTopic === 'Technology') {
      if (!formik.values.programmingLanguage) {
        newErrors.programmingLanguage = 'Favorite Programming Language is required';
      }
      if (!formik.values.experience) {
        newErrors.experience = 'Years of Experience is required';
      }
      if(formik.values.experience < 0 || formik.values.experience > 50) {
          newErrors.experience = "Invalid experience";
      }

    } else if (formik.values.surveyTopic === 'Health') {
      if (!formik.values.exerciseFrequency) {
        newErrors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!formik.values.dietPreference) {
        newErrors.dietPreference = 'Diet Preference is required';
      }
    } else if (formik.values.surveyTopic === 'Education') {
      if (!formik.values.highestQualification) {
        newErrors.highestQualification = 'Highest Qualification is required';
      }
      if (!formik.values.fieldOfStudy) {
        newErrors.fieldOfStudy = 'Field of Study is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopicChange = (event) => {
    formik.setFieldValue('surveyTopic', event.target.value);
    fetchAdditionalQuestions(event.target.value);
    setSurveyData({ ...surveyData, surveyTopic: event.target.value });
  };

  
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      surveyTopic: '',
      programmingLanguage: '',
      experience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: ''
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      surveyTopic: Yup.string().required('Survey Topic is required'),
      feedback: Yup.string()
        .min(50, 'Feedback must be at least 50 characters')
        .required('Feedback is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setSurveyData({ ...surveyData, ...values });
      if (validateFields()) {
        alert(JSON.stringify(surveyData, null, 2));
      } else {
        alert('Please fix the errors in the form');
      }
    }
  });

  useEffect(() => {
    validateFields(formik.values);
  }, [formik.values]);

  console.log(surveyData);


  const renderTechnologySection = () => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Programming Language:
          <select
            name="programmingLanguage"
            value={formik.values.programmingLanguage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select a programming language</option>
            <option value="Daily">Javascript</option>
            <option value="Weekly">C++</option>
            <option value="Monthly">C#</option>
          </select>
          
          {errors.programmingLanguage && <div className="text-red-600">{errors.programmingLanguage}</div>}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Years of Experience:
          <input
            type="number"
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          />
          {errors.experience && <div className="text-red-600">{errors.experience}</div>}
        </label>
      </div>
    </div>
  );

  const renderHealthSection = () => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Exercise Frequency:
          <select
            name="exerciseFrequency"
            value={formik.values.exerciseFrequency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select an exercise frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          {errors.exerciseFrequency && <div className="text-red-600">{errors.exerciseFrequency}</div>}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Diet Preference:
          <select
            name="dietPreference"
            value={formik.values.dietPreference}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select a diet preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
          </select>
          {errors.dietPreference && <div className="text-red-600">{errors.dietPreference}</div>}
        </label>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Highest Qualification:
          <select
            name="highestQualification"
            value={formik.values.highestQualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select a qualification</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
          {errors.highestQualification && <div className="text-red-600">{errors.highestQualification}</div>}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Field of Study:
          <input
            type="text"
            name="fieldOfStudy"
            value={formik.values.fieldOfStudy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          />
          {errors.fieldOfStudy && <div className="text-red-600">{errors.fieldOfStudy}</div>}
        </label>
      </div>
    </div>
  );

  return (
    <div className='flex min-h-screen flex-col justify-center items-center bg-gray-800 py-12'>
      <form onSubmit={formik.handleSubmit} className="w-full md:w-5/12 flex flex-col gap-3  bg-white p-4">
        <h2 className='text-5xl text-center'>Survey Form</h2>
        <div className="flex flex-col gap-3">
          <CustomInput
            label="Full Name"
            type="text"
            name="fullName"
            val={formik.values.fullName}
            onCh={formik.handleChange}
            onBl={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-600">{formik.errors.fullName}</div>
          )}
        </div>

        <div className="mb-4">
        
          <CustomInput
            label="Email"
            type="email"
            name="email"
            val={formik.values.email}
            onCh={formik.handleChange}
            onBl={formik.handleBlur}
            className="mt-1 p-2 border rounded w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Survey Topic:
            <select
              name="surveyTopic"
              value={formik.values.surveyTopic}
              onChange={handleTopicChange}
              onBlur={formik.handleBlur}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Select a survey topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {formik.touched.surveyTopic && formik.errors.surveyTopic && (
              <div className="text-red-600">{formik.errors.surveyTopic}</div>
            )}
          </label>
        </div>

        {formik.values.surveyTopic === 'Technology' && renderTechnologySection()}
        {formik.values.surveyTopic === 'Health' && renderHealthSection()}
        {formik.values.surveyTopic === 'Education' && renderEducationSection()}

        <div className="mb-4">
          <div className='flex flex-col gap-2'>
            <ReactQuill
              theme="snow"
              style={{ backgroundColor: "white", color: "black" }}
              name="feedback"
              onChange={formik.handleChange("feedback")}
              value={formik.values.feedback}
            />
            {formik.touched.feedback && formik.errors.feedback && (
              <div className="text-red-600">{formik.errors.feedback}</div>
            )}
          </div>
        </div>

        {additionalQuestions.map((question, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700">
              {question.label}:
              <input
                type={question.type}
                name={question.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
