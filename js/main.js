const cliRoot = document.getElementById('cli-root');

const newCommandUI = () => {
  const commandBox = document.createElement('div');
  commandBox.classList.add('commandBox');

  const paragraph = document.createElement('p');

  const promptUser = document.createElement('span');
  promptUser.classList.add('promptUser');
  promptUser.textContent = 'guest@ubuntu:';

  const promptLocation = document.createElement('span');
  promptLocation.classList.add('promptLocation');
  promptLocation.textContent = '~';

  const promptDollar = document.createElement('span');
  promptDollar.classList.add('promptDollar');
  promptDollar.innerHTML = '$&nbsp;';

  const terminalInput = document.createElement('input');
  terminalInput.classList.add('terminalInput');
  terminalInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleCommand(event.target.value);
    }
  });

  paragraph.append(promptUser, promptLocation, promptDollar, terminalInput);
  commandBox.append(paragraph);
  cliRoot.append(commandBox);
};

newCommandUI();

const terminalBox = new WinBox({
  title: 'guest@ubuntu',
  mount: document.getElementById('cli-root'),
  x: 'center',
  y: 'center',
});

const handleCommand = (command) => {
  switch (command.toLowerCase()) {
    case WGET_RESUME:
      window.open(RESUME_URL, '_blank');
      break;
    case LS_PROJECTS:
      break;
    case LS_SKILLS:
      break;
    case EXIT:
      terminalBox.close();
      break;
    default:
      break;
  }
};
