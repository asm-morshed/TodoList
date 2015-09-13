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
    public class TaskController : ApiController
    {
        private TaskService service = new TaskService();

        public ResponseModel Get(int projectId, string sortOn="", string sortBy="")
        {
            ResponseModel response;
            try
            {
                List<TaskViewModel> tasks = projectId == 0 ? service.GetAll() : service.GetAllByProject(projectId, sortOn, sortBy);

                response=new ResponseModel(tasks);
            }
            catch (Exception exception)
            {
                response=new ResponseModel(null,false,"Error Occurred",exception);
            }
            return response;
        }

        public ResponseModel GetDetail(int id)
        {
            ResponseModel response;
            try
            {
                if (id>0)
                {
                    Task task = service.GetById(id);

                    response = new ResponseModel(task);
                }

                else
                {
                    response=new ResponseModel(isSuccess:false,message:"Id can not be zero");
                }
                
            }
            catch (Exception exception)
            {
                response = new ResponseModel(null, false, "Error Occurred", exception);
            }
            return response;
        }

        public ResponseModel Post(Task task)
        {
            ResponseModel response;
            try
            {
                task.Project = null;
                int id = service.Save(task);
                response = id>0 ? new ResponseModel(id) : new ResponseModel(null,false,"Couldn't Save");
            }
            catch (Exception exception)
            {
                response=new ResponseModel(null,false,"Error Occurred",exception);
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
