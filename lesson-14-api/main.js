const htmlEL = document.querySelector('h1');
htmlEL.textContent = 'loading...';

function sleep(ms, data) {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

async function getNumber(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.number;
}

async function getJobID(numbers) {
  const response = await fetch('https://redi.travisshears.xyz/api/mathworkflow/v1/total', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numbers: numbers })
  });
  const result = await response.json();
  return result.jobID;
}

const main = async () => {
  const promises = [];
  for (let i = 0; i < 3; i++) {
    promises.push(getNumber('https://redi.travisshears.xyz/api/mathworkflow/v1/random'));
  }
  const numbers = await Promise.all(promises);
  await sleep(3000);

  htmlEL.textContent = '...got numbers';
  console.log(numbers);
  
  htmlEL.textContent = 'job processing…';
  const jobID = await getJobID(numbers);
  console.log(jobID);

  let result;
  while (1) {
    await sleep(1000);
    const sumResponse = await fetch('https://redi.travisshears.xyz/api/mathworkflow/v1/job-result/' + jobID);
    result = await sumResponse.json();
    if (result.status == 'complete') break;
  }

  htmlEL.textContent = `${numbers.join(' + ')} = ${result.total}`;
};

main()
  .catch(error => {
    htmlEL.textContent = error.message;
    htmlEL.style.color = 'red';
  });