using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.DataAccess;
using TodoList.ViewModel;

namespace TodoList.Service
{
    public class ProjectService
    {

        public List<ProjectViewModel> GetAll()
        {
            todoListDbEntities db = new todoListDbEntities();
            IQueryable<Project> dbSet = db.Projects.AsQueryable();
            List<ProjectViewModel> list = dbSet.Select(x => new ProjectViewModel() { Id = x.Id, Name = x.Name, Count = x.Count}).ToList();
            return list;
        }

        public int Save(Project project)
        {

            todoListDbEntities db = new todoListDbEntities();

            Project dbProject;
            if (project.Id>0)
            {
                 dbProject = db.Projects.Find(project.Id);
                if (dbProject!=null)
                {
                    dbProject.Name = project.Name;
                    dbProject.Changed=DateTime.Now;
                }
            }
            else
            {
                project.Created = DateTime.Now;
                project.Changed = DateTime.Now;
                dbProject = db.Projects.Add(project);
            }

           
            db.SaveChanges();
            return dbProject.Id;
        }

        public Project GetById(int id)
        {
            todoListDbEntities db=new todoListDbEntities();
            Project project = db.Projects.Find(id);
            return project;
        }

        public bool Delete(int id)
        {
            todoListDbEntities db=new todoListDbEntities();
            Project project = db.Projects.Find(id);
            if (project!=null)
            {

                db.Projects.Remove(project);
                db.SaveChanges();
            }
            return true;
        }
    }
}
