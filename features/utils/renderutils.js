import Settings from "../../config.js";
const registers = [];

export const registerWhen = (trigger, dependency) => {
  const entry = { controller: trigger.unregister(), dependency, registered: false };
  registers.push(entry);
  
  if (!dependency()) return;
  entry.controller.register();
  entry.registered = true;
};

const setRegisters = () => {
  registers.forEach(item => {
    const shouldRegister = item.dependency();
    if (shouldRegister === item.registered) return;
    
    item.controller[shouldRegister ? 'register' : 'unregister']();
    item.registered = shouldRegister;
  });
};

Settings().onCloseGui(setRegisters);