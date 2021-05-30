const cliRoot = document.getElementById('cli-root');

const newCommandUI = (isHelpCommand) => {
  if (isHelpCommand === undefined) {
    isHelpCommand = false;
  }

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

  paragraph.append(promptUser, promptLocation, promptDollar);

  const terminalInput = document.createElement('input');

  if (isHelpCommand) {
    paragraph.append('commands');
    const commandArgument = document.createElement('span');
    commandArgument.classList.add('commandArgument');
    commandArgument.innerHTML = '&nbsp;--help';
    paragraph.append(commandArgument);
  } else {
    terminalInput.classList.add('terminalInput');
    terminalInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.target.disabled = true;
        handleCommand(event.target.value);
        newCommandUI();
      }
    });
    paragraph.append(terminalInput);
  }
  commandBox.append(paragraph);
  cliRoot.append(commandBox);
  terminalInput.focus();
};

const responseUI = (textContent) => {
  const responseBox = document.createElement('div');
  responseBox.classList.add('commandBox');
  const paragraph = document.createElement('p');
  paragraph.textContent = textContent;
  responseBox.append(paragraph);
  cliRoot.append(responseBox);
};

const helpCommandUI = () => {
  const commandBox = document.createElement('div');
  commandBox.classList.add('commandBox');
  commandBox.innerHTML =
    '<p>&nbsp;&nbsp;&nbsp;├ wget resume</p><p>&nbsp;&nbsp;&nbsp;├ ls projects</p><p>&nbsp;&nbsp;&nbsp;├ ls skills</p><p>&nbsp;&nbsp;&nbsp;├ exit</p>';
  cliRoot.append(commandBox);
};

newCommandUI(true);
helpCommandUI();
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
    case LS_PROJECTS: {
      responseUI(PROJECTS);
      break;
    }
    case LS_SKILLS: {
      responseUI(SKILLS);
      break;
    }
    case EXIT:
      terminalBox.close();
      break;
    case HELP:
    case COMMANDS_HELP:
      helpCommandUI();
      break;
    default:
      responseUI(`No command '${command}' found.`);
      break;
  }
};
