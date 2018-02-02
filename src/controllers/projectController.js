import mongoose from 'mongoose';
import { ProjectSchema } from '../models/projectModel';

// Creating project variable so Project objects can be created
// Modelled around the schema we have built
// Each Project object will then be saved to our DB via mongoose
const Project = mongoose.model('Project', ProjectSchema);

// Export this function so we can call it in our routes file when
// the save project route (POST request) is called upon by the server
export const addNewProject = (req, res) => {
  // Temporary local variable to store new Project object
  // req.body is the form data posted by the user when creating a new project
  // We take each of those fields and compare with our model Schema
  // Before posting/saving to our Mongo database
  let newProject = new Project(req.body);

  newProject.save((err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

// Exported function for use on our default GET Request
// Used to display all projects on homepage
export const getAllProjects = (req, res) => {
  Project.find({ /* No parameters here as we want all projects */ }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

//
//
export const getProjectByID = (req, res) => {
  // Load project collection
  // Use mongoose built in findById method on collection
  // Make use of id parameter from the route (projectRoutes ':/id') to find which project we are looking for
  Project.findById(req.params.id, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};

//
//
export const updateProject = (req, res) => {
  // Load project collection
  // Use mongoose method on collection
  // Pass id from route parameter in to method param
  // Pass request body in so we know what data we are updating
  // Tell it that we will be returning new data so that the modified document is returned rather than the original
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, project) => {
    if (err) res.send(err);

    res.json(project);
  });
};
