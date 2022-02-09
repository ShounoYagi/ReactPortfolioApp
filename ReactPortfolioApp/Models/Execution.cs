using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPortfolioApp.Models
{
    public class Execution
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        public int ExecuteTime { get; set; }
        [Required]
        public int PassPoints { get; set; }

        public int MaxPoints { get; set; }
        [Required]
        public bool DeleteFlag { get; set; }
    }
}