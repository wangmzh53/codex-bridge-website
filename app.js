'use strict';

// A single, clearly labelled simulation. No SSH connection or network request is made.
const demo = document.querySelector('.bridge-demo');
const connectButton = document.querySelector('#connect-button');
const demoMessage = document.querySelector('#demo-message');
const statusText = document.querySelector('#connection-status span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

connectButton.hidden = false;
connectButton.addEventListener('click', () => {
  if (demo.dataset.state === 'connected') {
    demo.dataset.state = 'idle';
    statusText.textContent = '等待连接';
    demoMessage.textContent = '少记几个端口，多写几行好代码。';
    connectButton.innerHTML = '试着连接 <span aria-hidden="true">↗</span>';
    return;
  }
  demo.dataset.state = 'connecting';
  connectButton.disabled = true;
  connectButton.textContent = '连接中…';
  statusText.textContent = '正在搭桥';
  demoMessage.textContent = '正在建立演示通道…';
  window.setTimeout(() => {
    demo.dataset.state = 'connected';
    statusText.textContent = '通道已连接';
    demoMessage.textContent = '桥搭好了。实际使用时，再应用所选配置。';
    connectButton.textContent = '重新体验';
    connectButton.disabled = false;
  }, reducedMotion.matches ? 150 : 1000);
});

// Progressive enhancement: without JavaScript, both use cases remain readable.
const tablist = document.querySelector('.scenario-tabs');
const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
function selectTab(tab, focus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  if (focus) tab.focus({ preventScroll: true });
}
tablist.hidden = false;
selectTab(tabs[0]);
for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next = tabs.indexOf(tab);
    if (event.key === 'ArrowRight') next = (next + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (next - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[next], true);
  });
}

// Deep links to an answer open it, instead of landing on a closed disclosure.
function openLinkedAnswer() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener('hashchange', openLinkedAnswer);
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
  });
});
openLinkedAnswer();
