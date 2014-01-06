using System;

namespace Uniquify.it.ViewModels
{
    public class IndexViewModel
    {
        public string Year { get { return DateTime.Now.ToString("yyyy"); } }
    }
}