Алдаа 1 
Нэршил usr_mgr - UserManager  байх ёстой
Алдаа 2
Мэдээллийн далдлалт(Imformation hiding) - db_conn болон users_arr нь public нь гаднаас шууд өөрчлөх боломжтой Эдгээр нь private байх ёстой.
Алдаа 3
(Boolean/Flag параметр) - do)ser_op(obj, flag, timeout) дотор  flag  0=create, 1=update, 2=delete, 3=restore гэж 4 өөр үйлдлийг нэг метод дотор шахсан. Энэ нь createUser(), updateUser(), deleteUser(), restoreUser() гэж тусдаа метод болгох ёстой.
Алдаа 4
Any төрөл - obj:any, Array<any>, буцаах any - төрөл огт тодорхойлогдоогүй. User interface үүсгэж ашиглах хэрэгтэй.
Алдаа 5
Return  type - get_u нь  string буцаадаг Хэрэглэгч олдвол JSON string, олдохгүй бол 'ERR_404' string. Алдааг exception -оор өгөгдлийг User объектоор буцаах ёстой.
Алдаа 6
Холимог параметр (Dual-purpose parameter)
get_u(id_or_email, flag) — нэг параметр хоёр өөр утга агуулж байна (id эсвэл email). flag дахин тодорхойлогдоогүй. getUserById(id) ба getUserByEmail(email) гэж салгах хэрэгтэй.
Алдаа 7 
timeout параметр тdo_user_op-д timeout параметр байгаа ч API-д энэ нь дотоод хэрэгжилтийн асуудал caller-т ил байх ёсгүй.


 RateLimiter interface ашигласан → implementation солиход амар
 Factory pattern → concrete class-уудыг нууцалсан
 3 implementation → FixedWindow, SlidingWindow, TokenBucket
 Custom error class ашигласан
 Unit test (15+) → correctness баталсан
