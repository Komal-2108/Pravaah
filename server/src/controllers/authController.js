import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbStore } from '../config/db.js';
import { config } from '../config/env.js';

export const register = (req, res, next) => {
  try {
    const { email, password, role, name, phone, training_center_id, organization_name, organization_type } = req.body;

    const existingUser = dbStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const newUser = {
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      password_hash,
      role: role || 'trainee',
      name,
      phone: phone || '',
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      created_at: new Date().toISOString()
    };

    dbStore.users.push(newUser);

    let specificProfile = null;

    if (newUser.role === 'trainee') {
      const newTrainee = {
        id: `trainee-${Date.now()}`,
        user_id: newUser.id,
        registration_number: `PRV-TR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        training_center_id: training_center_id || dbStore.training_centers[0].id,
        village_block: 'Block Central',
        district: 'Anand',
        state: 'Gujarat',
        target_role_id: 'job-role-001',
        employment_readiness: 50.0,
        evidence_confidence: 60.0,
        created_at: new Date().toISOString()
      };
      dbStore.trainees.push(newTrainee);
      specificProfile = newTrainee;

      // Seed initial skill graph nodes
      dbStore.skills.forEach(s => {
        dbStore.trainee_skills.push({
          id: `ts-${Date.now()}-${s.id}`,
          trainee_id: newTrainee.id,
          skill_id: s.id,
          current_level: 40.0,
          evidence_confidence: 50.0,
          status: 'developing',
          last_assessed_at: new Date().toISOString()
        });
      });
    } else if (newUser.role === 'employer') {
      const newEmployer = {
        id: `emp-${Date.now()}`,
        user_id: newUser.id,
        organization_name: organization_name || name,
        organization_type: organization_type || 'Cooperative Enterprise',
        district: 'Anand',
        state: 'Gujarat',
        verified: true,
        contact_person: name
      };
      dbStore.employers.push(newEmployer);
      specificProfile = newEmployer;
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        avatar_url: newUser.avatar_url,
        profile: specificProfile
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = dbStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    let profile = null;
    if (user.role === 'trainee') {
      profile = dbStore.trainees.find(t => t.user_id === user.id);
    } else if (user.role === 'employer') {
      profile = dbStore.employers.find(e => e.user_id === user.id);
    } else if (user.role === 'admin') {
      profile = { designation: 'Regional Training Director', center: 'Anand Cooperative Skill Development Institute' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar_url: user.avatar_url,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req, res, next) => {
  try {
    const user = dbStore.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let profile = null;
    if (user.role === 'trainee') {
      profile = dbStore.trainees.find(t => t.user_id === user.id);
    } else if (user.role === 'employer') {
      profile = dbStore.employers.find(e => e.user_id === user.id);
    } else if (user.role === 'admin') {
      profile = { designation: 'Regional Training Director', center: 'Anand Cooperative Skill Development Institute' };
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar_url: user.avatar_url,
        profile
      }
    });
  } catch (err) {
    next(err);
  }
};
