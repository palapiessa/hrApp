export function calculateWorkExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // Fix negative months
  if (months < 0) {
    years--; // go back 1 year
    months += 12; //add 12 months to make months positive
  }

  return { years, months };
}
