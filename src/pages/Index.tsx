import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'МИКРОСКОП С ЦИФРОВЫМ ДИСПЛЕЕМ',
    description: 'Современный лабораторный микроскоп с встроенным цифровым дисплеем для удобного наблюдения',
    price: 45000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/dada1f84-82a6-458f-ad1e-20093162f9fd.jpg'
  },
  {
    id: 2,
    name: 'НАБОР ИЗМЕРИТЕЛЬНЫХ ПРИБОРОВ',
    description: 'Комплект профессиональных измерительных инструментов для технических работ',
    price: 32000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/bcb21388-883b-4014-a6cc-81662176549f.jpg'
  },
  {
    id: 3,
    name: 'ПРЕЦИЗИОННЫЙ ИЗМЕРИТЕЛЬ',
    description: 'Высокоточное измерительное устройство с цифровой индикацией',
    price: 28000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/cd14ce2a-564a-4a51-a8ad-1ba770ec956a.jpg'
  },
  {
    id: 4,
    name: 'ЛАБОРАТОРНЫЕ ВЕСЫ ЦИФРОВЫЕ',
    description: 'Электронные весы с высокой точностью измерения для лабораторных работ',
    price: 22000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/dada1f84-82a6-458f-ad1e-20093162f9fd.jpg'
  },
  {
    id: 5,
    name: 'КОМПЛЕКТ ЛАБОРАТОРНОЙ ПОСУДЫ',
    description: 'Профессиональный набор стеклянной лабораторной посуды',
    price: 15000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/bcb21388-883b-4014-a6cc-81662176549f.jpg'
  },
  {
    id: 6,
    name: 'ЭЛЕКТРОННЫЙ ТЕРМОМЕТР',
    description: 'Цифровой термометр с широким диапазоном измерения температуры',
    price: 8500,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/cd14ce2a-564a-4a51-a8ad-1ba770ec956a.jpg'
  },
  {
    id: 7,
    name: 'АНАЛИТИЧЕСКИЕ ПРИБОРЫ',
    description: 'Комплект аналитического оборудования для химических лабораторий',
    price: 56000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/dada1f84-82a6-458f-ad1e-20093162f9fd.jpg'
  },
  {
    id: 8,
    name: 'МАГНИТНАЯ МЕШАЛКА',
    description: 'Современная магнитная мешалка с подогревом для лабораторных работ',
    price: 18000,
    image: 'https://cdn.poehali.dev/projects/97f7d147-d945-4f96-be81-726752592502/files/bcb21388-883b-4014-a6cc-81662176549f.jpg'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-gray-900">КОЛЛЕДЖ</div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveSection('college')}
                className={`text-sm font-medium ${activeSection === 'college' ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                КОЛЛЕДЖ
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium ${activeSection === 'catalog' ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                КАТАЛОГ
              </button>
              <button
                onClick={() => setActiveSection('news')}
                className={`text-sm font-medium ${activeSection === 'news' ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                НОВОСТИ
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium ${activeSection === 'contacts' ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                КОНТАКТЫ
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>КОРЗИНА</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">ИТОГО:</span>
                          <span className="text-2xl font-bold text-primary">{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          ОФОРМИТЬ ЗАКАЗ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">КАТАЛОГ</h1>
            <p className="text-gray-600 mb-8">Лабораторное оборудование для учебных заведений</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2 text-gray-900 min-h-[40px]">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} ₽</span>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="gap-1"
                      >
                        <Icon name="ShoppingCart" size={16} />
                        <Icon name="ArrowRight" size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeSection === 'college' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">О КОЛЛЕДЖЕ</h1>
            <p className="text-gray-600 mb-4">
              Наш колледж – современное учебное заведение, оснащенное передовым лабораторным оборудованием 
              для подготовки квалифицированных специалистов.
            </p>
            <p className="text-gray-600">
              В нашем магазине представлено профессиональное оборудование, которое используется 
              в образовательном процессе и доступно для приобретения.
            </p>
          </div>
        )}

        {activeSection === 'news' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">НОВОСТИ</h1>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Поступление нового оборудования</h3>
                <p className="text-sm text-gray-500 mb-3">10 ноября 2025</p>
                <p className="text-gray-600">В наш каталог добавлено современное лабораторное оборудование для технических специальностей.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">Скидки для студентов</h3>
                <p className="text-sm text-gray-500 mb-3">5 ноября 2025</p>
                <p className="text-gray-600">Студенты колледжа получают специальную скидку 15% на все товары при предъявлении студенческого билета.</p>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">КОНТАКТЫ</h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Адрес</h3>
                  <p className="text-gray-600">г. Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Телефон</h3>
                  <p className="text-gray-600">8 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-600">info@college-shop.ru</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-gray-500">© 2025 Магазин колледжа. Все права защищены.</p>
        </div>
      </footer>

      <Sheet open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedProduct && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedProduct.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="aspect-square overflow-hidden bg-gray-50 rounded-lg">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Описание</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Характеристики</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Артикул</span>
                      <span className="font-medium">LAB-{selectedProduct.id.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Категория</span>
                      <span className="font-medium">Лабораторное оборудование</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Гарантия</span>
                      <span className="font-medium">12 месяцев</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Наличие</span>
                      <span className="font-medium text-green-600">В наличии</span>
                    </div>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white pt-4 border-t space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Цена:</span>
                    <span className="text-3xl font-bold text-primary">{selectedProduct.price.toLocaleString()} ₽</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    ДОБАВИТЬ В КОРЗИНУ
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;