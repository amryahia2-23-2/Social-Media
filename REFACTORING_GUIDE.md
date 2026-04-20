# Refactoring Guide - Using Custom Hooks

## Summary
تم إنشاء custom hooks لتجميع كل الـ mutations المتكررة في مكان واحد لتسهيل الصيانة وتقليل التكرار.

## Created Hooks

### 1. usePostMutations.js
**Location:** `src/hooks/usePostMutations.js`

**Exports:**
- `deletePostMutation` - حذف بوست
- `editPostMutation` - تعديل بوست
- `likePostMutation` - لايك بوست
- `sharePostMutation` - مشاركة بوست
- `bookmarkPostMutation` - حفظ بوست

**Usage:**
```javascript
import { usePostMutations } from "../../hooks/usePostMutations";

const { deletePostMutation, editPostMutation, likePostMutation, sharePostMutation, bookmarkPostMutation } = usePostMutations();

// استخدام
deletePostMutation.mutate(postId);
editPostMutation.mutate({ postId, body, image, removeImage });
likePostMutation.mutate(postId);
sharePostMutation.mutate({ postId, body });
bookmarkPostMutation.mutate(postId);
```

---

### 2. useCommentMutations.js
**Location:** `src/hooks/useCommentMutations.js`

**Exports:**
- `createCommentMutation` - إضافة كومنت
- `editCommentMutation` - تعديل كومنت
- `deleteCommentMutation` - حذف كومنت
- `likeCommentMutation` - لايك كومنت
- `createReplyMutation` - إضافة رد

**Usage:**
```javascript
import { useCommentMutations } from "../../hooks/useCommentMutations";

const { createCommentMutation, editCommentMutation, deleteCommentMutation, likeCommentMutation, createReplyMutation } = useCommentMutations(postId);

// استخدام
createCommentMutation.mutate({ content, image });
editCommentMutation.mutate({ commentId, content, image, removeImage });
deleteCommentMutation.mutate(commentId);
likeCommentMutation.mutate(commentId);
createReplyMutation.mutate({ commentId, content, image });
```

---

### 3. useReplyMutations.js
**Location:** `src/hooks/useReplyMutations.js`

**Exports:**
- `editReplyMutation` - تعديل رد
- `deleteReplyMutation` - حذف رد
- `likeReplyMutation` - لايك رد

**Usage:**
```javascript
import { useReplyMutations } from "../../hooks/useReplyMutations";

const { editReplyMutation, deleteReplyMutation, likeReplyMutation } = useReplyMutations(postId, commentId);

// استخدام
editReplyMutation.mutate({ replyId, content, image, removeImage });
deleteReplyMutation.mutate(replyId);
likeReplyMutation.mutate(replyId);
```

---

### 4. useProfileMutations.js
**Location:** `src/hooks/useProfileMutations.js`

**Exports:**
- `updatePhotoMutation` - تحديث صورة البروفايل

**Usage:**
```javascript
import { useProfileMutations } from "../../hooks/useProfileMutations";

const { updatePhotoMutation } = useProfileMutations(profileUserId);

// استخدام
updatePhotoMutation.mutate({ file, privacy });
```

---

### 5. useLogin & useRegister
**Location:** 
- `src/hooks/useLogin.js`
- `src/hooks/useRegister.js`

**Note:** تم نقلهم من `src/features/auth/` إلى `src/hooks/` للتنظيم

**Usage:**
```javascript
import { useLogin } from "../../hooks/useLogin";
import { useRegister } from "../../hooks/useRegister";

const loginMutation = useLogin();
const registerMutation = useRegister();

// استخدام
loginMutation.mutate({ email, password });
registerMutation.mutate({ name, email, password, ... });
```

---

## Files to Refactor

### ✅ Already Refactored:
1. `src/features/profile/ProfilePage.jsx` - يستخدم `useProfileMutations`

### 🔄 Need Refactoring:

#### High Priority:
1. **PostCard.jsx** - استبدال mutations بـ `usePostMutations`
   - حذف: deleteMutation, editMutation, likeMutation, shareMutation, bookmarkMutation
   - استبدال بـ: `const { deletePostMutation, editPostMutation, ... } = usePostMutations()`

2. **CommentItem.jsx** - استبدال mutations بـ `useCommentMutations`
   - حذف: likeMutation, editMutation, deleteMutation
   - استبدال بـ: `const { likeCommentMutation, editCommentMutation, deleteCommentMutation } = useCommentMutations(postId)`

3. **ReplyItem.jsx** - استبدال mutations بـ `useReplyMutations`
   - حذف: editMutation, deleteMutation, likeMutation
   - استبدال بـ: `const { editReplyMutation, deleteReplyMutation, likeReplyMutation } = useReplyMutations(postId, commentId)`

4. **CreateComment.jsx** - استبدال mutation بـ `useCommentMutations`
   - حذف: createCommentMutation
   - استبدال بـ: `const { createCommentMutation } = useCommentMutations(postId)`

5. **LoginPage.jsx** - يستخدم بالفعل `useLogin`
   - ✅ Already using the hook

6. **RegisterPage.jsx** - يستخدم بالفعل `useRegister`
   - ✅ Already using the hook

---

## Benefits

✅ **تقليل التكرار**: كل الـ mutations في مكان واحد
✅ **سهولة الصيانة**: تعديل واحد يؤثر على كل المشروع
✅ **تنظيم أفضل**: كل feature له hook خاص
✅ **إعادة استخدام**: نفس الـ logic في أماكن متعددة
✅ **Testing**: أسهل في عمل unit tests

---

## Next Steps

1. تطبيق الـ hooks على الملفات المذكورة أعلاه
2. حذف الـ imports غير المستخدمة (useMutation, useQueryClient, axiosInstance, toast)
3. اختبار كل feature بعد التعديل
4. حذف أي console.logs غير ضرورية

---

## Notes

- الـ hooks تتعامل مع toast notifications تلقائياً
- الـ hooks تتعامل مع cache invalidation تلقائياً
- لا حاجة لـ useQueryClient في الـ components بعد الآن
- الـ error handling موجود في الـ hooks
