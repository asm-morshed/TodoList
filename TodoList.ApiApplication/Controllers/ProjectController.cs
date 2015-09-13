using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TodoList.DataAccess;
using TodoList.Service;
using TodoList.ViewModel;

namespace TodoList.ApiApplication.Controllers
{
    public class ProjectController : ApiController
    {
        
        ProjectService service=new ProjectService();
        public ResponseModel Get()
        {

            ResponseModel response;
            try
            {
                List<ProjectViewModel> projects = service.GetAll();
                response=new ResponseModel(projects);
            }
            catch (Exception exception)
            {
                response=new ResponseModel(null,false,"Error Ocured",exception);
            }
            return response;
            
        }

        public ResponseModel Get(int id)
        {
            Project project = service.GetById(id);
            project = new Project() {Id = project.Id, Name = project.Name};
            return new ResponseModel(project);
        }

        public ResponseModel Post(Project project)
        {
            ResponseModel response;
            try
            {
                int id = service.Save(project);
                response = id>0 ? new ResponseModel(id) : new ResponseModel(null,false,"Couldn't Save");
            }
            catch (Exception exception)
            {
                response = new ResponseModel(null, false, "Error Ocured", exception);
            }
            return response;
        }

        public ResponseModel Delete(int id)
        {
            ResponseModel response;
            try
            {
                bool deleted = service.Delete(id);
                response = deleted ? new ResponseModel(id) : new ResponseModel(null, false, "Couldn't delete");
            }
            catch (Exception exception)
            {
                response = new ResponseModel(null, false, "Error Ocured", exception);
            }
            return response;
        }
    }
}
