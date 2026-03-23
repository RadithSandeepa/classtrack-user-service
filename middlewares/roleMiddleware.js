
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
      try {
        const user = req.user; // comes from authMiddleware
  
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
  
        next();
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    };
};