const cliRoot = document.getElementById('cli-root');

// This creates the Terminal (Dialog Box)
const terminalBox = new WinBox({
  title: 'guest@ubuntu',
  mount: document.getElementById('cli-root'),
  x: 'center',
  y: 'center',
  width: '85%',
  height: '80%',
});

window.addEventListener('resize', windowResize);
function windowResize() {
  terminalBox.resize('85%', '80%').move('center', 'center');
}

// Generates the UI for a new command
const newCommandUI = (isHelpCommand = false) => {
  const commandBox = document.createElement('div');
  commandBox.classList.add('commandBox');

  const paragraph = document.createElement('p');
  paragraph.classList.add('commandLine');

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
    commandBox.append(paragraph);
    cliRoot.append(commandBox);
    terminalInput.focus();
  } else {
    terminalInput.classList.add('terminalInput');
    terminalInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.target.disabled = true;
        handleCommand(event.target.value);
        newCommandUI(false);
      }
    });
    paragraph.append(terminalInput);
    commandBox.append(paragraph);
    cliRoot.append(commandBox);
    terminalInput.focus();
  }
};

// Populates UI in response to a command
const commandResponseUI = (textContent) => {
  const responseBox = document.createElement('div');
  responseBox.classList.add('commandBox');
  const paragraph = document.createElement('p');
  paragraph.textContent = textContent;
  responseBox.append(paragraph);
  cliRoot.append(responseBox);
};

// Populates UI for the ls projects command
const commandProjectsUI = (projects) => {
  const responseBox = document.createElement('div');
  responseBox.classList.add('commandBox');
  const paragraph = document.createElement('p');

  let textContent = '';
  Object.entries(projects).forEach(([key, value]) => {
    textContent = textContent.concat(`${key}:&nbsp;${value}<br/><br/>`);
    console.log(textContent);
  });

  paragraph.innerHTML = textContent;
  responseBox.append(paragraph);
  cliRoot.append(responseBox);
};

// The UI to show when user enters 'commands --help'
const commandHelpUI = () => {
  const commandBox = document.createElement('div');
  commandBox.classList.add('commandBox');
  commandBox.innerHTML =
    '<p>&nbsp;&nbsp;&nbsp;├ wget resume</p><p>&nbsp;&nbsp;&nbsp;├ ls projects</p><p>&nbsp;&nbsp;&nbsp;├ ls skills</p><p>&nbsp;&nbsp;&nbsp;├ echo</p><p>&nbsp;&nbsp;&nbsp;├ exit</p>';
  cliRoot.append(commandBox);
};

// Switch Case to handle the commands entered in terminal
const handleCommand = (command) => {
  switch (command.toLowerCase()) {
    case WGET_RESUME:
      window.open(RESUME_URL, '_blank');
      break;
    case LS_PROJECTS: {
      commandProjectsUI(PROJECTS);
      break;
    }
    case LS_SKILLS: {
      commandResponseUI(SKILLS);
      break;
    }
    case EXIT:
      terminalBox.close();
      break;
    case HELP:
    case COMMANDS_HELP:
      commandHelpUI();
      break;
    default:
      // For ECHO command
      if (command.split(' ')[0].toLowerCase() === ECHO) {
        commandResponseUI(command.substring(5));
        break;
      }
      commandResponseUI(`No command '${command}' found.`);
      break;
  }
};

// Showcasing the UI help command in first launch
newCommandUI(true);
commandHelpUI();
newCommandUI(false);
