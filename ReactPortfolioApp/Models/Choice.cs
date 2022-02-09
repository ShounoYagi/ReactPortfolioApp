using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPortfolioApp.Models
{
    public class Choice
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        public int ChoiceOrder { get; set; }

        public string ChiceText { get; set; }

        [Required]
        public bool HitFlag { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        [Required]
        public bool DeleteFlag { get; set; }
    }
}