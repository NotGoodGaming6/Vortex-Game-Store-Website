import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // SweetAlert üçün təkrar istifadə oluna bilən Toast konfiqurasiyası
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#16191e', // Sənin dizaynındakı tünd rəng
    color: '#fff',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      // SweetAlert Toast bildirişi
      Toast.fire({
        icon: 'success',
        title: 'Miqdar artırıldı',
        text: `${product.title} artıq səbətdədir.`
      });
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      Toast.fire({
        icon: 'success',
        title: 'Səbətə əlavə edildi',
        text: `${product.title} siyahıya əlavə olundu.`
      });
    }
  };

  const removeFromCart = (id) => {
    // Silməzdən əvvəl tam ekran xəbərdarlıq pəncərəsi (istəyə bağlı)
    Swal.fire({
      title: 'Əminsən?',
      text: "Məhsul səbətdən silinəcək!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5', // İndigo rəngi
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Xeyr',
      background: '#16191e',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        Toast.fire({
          icon: 'error',
          title: 'Məhsul silindi'
        });
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, 
      cartTotal, activePanel, setActivePanel, searchQuery, setSearchQuery 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);