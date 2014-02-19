using Uniquify.it.ViewModels;

namespace Uniquify.it.Modules
{
    using Nancy;

    public class BaseModule : NancyModule
    {
        public BaseModule()
        {
            Get["/"] = _ => View["Index", new IndexViewModel()];
            //Get["/Sample"] =
            //    _ =>
            //        Negotiate.WithView("Sample")
            //            .WithModel(new SampleViewModel {Body = "Sample Body", Title = "The Title"});
        }
    }
}