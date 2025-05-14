import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  const [permission, setPermission] = useState<string>('default');
  const [supported, setSupported] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  useEffect(() => {
    if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setSupported(false);
      return;
    }
    setPermission(Notification.permission);
    checkSubscriptionStatus();
  }, []);

  async function checkSubscriptionStatus() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  }

  async function subscribeUserToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
      );
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
      
      setIsSubscribed(true);
      console.log('User is subscribed:', subscription);
      return true;
    } catch (error) {
      console.error('Failed to subscribe user:', error);
      return false;
    }
  }

  async function unsubscribeFromPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        console.log('User is unsubscribed');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unsubscribing:', error);
      return false;
    }
  }

  const handleSubscriptionToggle = async () => {
    if (isSubscribed) {
      await unsubscribeFromPush();
    } else {
      if (permission === 'granted') {
        await subscribeUserToPush();
      } else if (permission === 'default') {
        const result = await Notification.requestPermission();
        setPermission(result);
        
        if (result === 'granted') {
          await subscribeUserToPush();
        }
      }
    }
  };

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!supported) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-[#2B2B2B] rounded-full shadow-lg hover:bg-[#3B3B3B] transition-colors duration-300"
      >
        <Bell size={20} className="text-[#A8E10C]" />
      </button>

      <div className={`notification-panel fixed top-0 right-0 h-full w-80 bg-[#2B2B2B] shadow-lg z-40 p-6 ${showPanel ? 'show' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <Bell size={24} className="text-[#A8E10C] mr-2" />
            <h4 className="text-xl font-bold">Notificações</h4>
          </div>
          
          <p className="text-sm text-[#CCCCCC] mb-6">
            Receba mensagens motivacionais mensais para manter seu foco nos estudos para o ENEM.
          </p>
          
          <button
            onClick={handleSubscriptionToggle}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isSubscribed
                ? 'bg-[#FF6060] hover:bg-[#FF3030] text-white'
                : 'bg-[#A8E10C] hover:bg-[#6AFF00] text-black'
            }`}
          >
            {isSubscribed ? 'Desativar Notificações' : 'Ativar Notificações'}
          </button>
          
          {permission === 'denied' && (
            <p className="text-xs text-red-400 mt-4">
              Notificações bloqueadas. Por favor, altere as permissões do site nas configurações do seu navegador.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;