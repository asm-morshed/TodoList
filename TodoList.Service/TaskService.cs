using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.DataAccess;
using TodoList.ViewModel;
using Task = TodoList.DataAccess.Task;

namespace TodoList.Service
{
    public class TaskService
    {
        public List<TaskViewModel> GetAll()
        {
            todoListDbEntities db = new todoListDbEntities();
            IQueryable<Task> dbSet = db.Tasks.AsQueryable();
            List<TaskViewModel> list = dbSet.Select
                (x => 
                    new TaskViewModel()
                    {
                        Id = x.Id, Name = x.Name ,
                        ProjectId = x.ProjectId,
                        ProjectName = x.Project.Name,
                        Priority=x.Priority,
                        DueDate=x.DueDate,
                        IsCompleted=x.isCompleted
                    }).ToList();
            return list;
        }

        public int Save(Task task)
        {
            todoListDbEntities db = new todoListDbEntities();

            Task dbTask;
            if (task.Id > 0)
            {
                dbTask = db.Tasks.Find(task.Id);
                if (dbTask != null)
                {
                    dbTask.Name = task.Name;
                    dbTask.DueDate = task.DueDate;
                    dbTask.isCompleted = task.isCompleted;
                    dbTask.Priority = task.Priority;
                    dbTask.ProjectId = task.ProjectId;

                    dbTask.Changed = DateTime.Now;
                }
            }
            else
            {
                task.Created = DateTime.Now;
                task.Changed = DateTime.Now;
                dbTask = db.Tasks.Add(task);
            }


            db.SaveChanges();

            UpdateProjectCount(task.ProjectId, db);
            return dbTask.Id;
        }

        public List<TaskViewModel> GetAllByProject(int projectId)
        {
            todoListDbEntities db = new todoListDbEntities();
            IQueryable<Task> dbSet = db.Tasks.Where(x=>x.ProjectId==projectId).AsQueryable();
            List<TaskViewModel> list = dbSet.Select(x => new TaskViewModel()
            {
                Id = x.Id, Name = x.Name,
                IsCompleted = x.isCompleted,
                DueDate = x.DueDate
            }).ToList();
            return list;
        }

        public bool Delete(int id)
        {
            todoListDbEntities db = new todoListDbEntities();
            Task task = db.Tasks.Find(id);
            if (task != null)
            {

                db.Tasks.Remove(task);
                db.SaveChanges();
            }
            return true;
        }

        public Task GetById(int id)
        {

            todoListDbEntities db = new todoListDbEntities();
            Task task = db.Tasks.Find(id);
            return new Task()
            {
                ProjectId = task.ProjectId,
                Name = task.Name,
                Id = task.Id,
                DueDate = task.DueDate,
                isCompleted = task.isCompleted,
                Priority = task.Priority,
               

            };
        }

        public bool MarkCompleter(Task task)
        {
            todoListDbEntities db = new todoListDbEntities();
            var dbTask = db.Tasks.Find(task.Id);
            if (dbTask!=null)
            {
                dbTask.isCompleted = true;
                db.SaveChanges();
                int projectId = dbTask.ProjectId;

                UpdateProjectCount(projectId, db);
            }
            return true;
        }

        private static void UpdateProjectCount(int projectId, todoListDbEntities db)
        {
            int unFinished = db.Tasks.Count(x => x.ProjectId == projectId && x.isCompleted == false);
            Project dbProject = db.Projects.Find(projectId);
            dbProject.Count = unFinished;
            db.SaveChanges();
        }

        public List<TaskViewModel> GetAllByProject(int projectId, string sortOn, string sortBy)
        {

            todoListDbEntities db = new todoListDbEntities();
            IQueryable<Task> queryable = db.Tasks.Where(x => x.ProjectId == projectId).AsQueryable();
            if (sortBy=="desc")
            {
                queryable = sortOn=="date" ? queryable.OrderByDescending(x => x.DueDate) : queryable.OrderByDescending(x => x.isCompleted);
            }
            else
            {
                queryable = sortOn == "date" ? queryable.OrderBy(x => x.DueDate) : queryable.OrderBy(x => x.isCompleted);
           
            }
            List<TaskViewModel> taskViewModels = queryable.Select(x =>
                new TaskViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    ProjectId = x.ProjectId,
                    ProjectName = x.Project.Name,
                    Priority = x.Priority,
                    DueDate = x.DueDate,
                    IsCompleted = x.isCompleted
                }).ToList();

            return taskViewModels;
        }
    }
}
