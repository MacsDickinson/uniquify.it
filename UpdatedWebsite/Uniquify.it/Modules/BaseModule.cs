namespace Uniquify.it.Modules
{
    using Nancy;
    using Uniquify.it.ViewModels;

    public class BaseModule : NancyModule
    {
        public BaseModule()
        {
            Get["/"] = _ =>
                Negotiate
                .WithModel(new SampleViewModel { Body = "Sample Body", Title = "The Title" })
                .WithView("Sample");
        }
    }
}