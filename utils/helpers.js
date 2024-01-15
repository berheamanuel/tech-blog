module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  format_date: (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },

  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

  is_my_page: (pageUser, userId) => {
    return pageUser === userId;
  },
 
};


