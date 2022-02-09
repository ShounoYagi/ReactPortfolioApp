using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPortfolioApp.Models
{
    public class Question
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int ExecutionId { get; set; }

        [Required]
        public int QuestionOrder { get; set; }

        public string BodyText { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        [Required]
        public bool DeleteFlag { get; set; }
    }
}