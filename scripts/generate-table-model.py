"""
EEL Table Model Generator for Blender
--------------------------------------
Run this script inside Blender (Scripting tab) to generate the resin table model.
It creates: ResinTop + Pedestal + BaseCap and exports to public/models/table.glb

Usage:
  1. Open Blender
  2. Go to Scripting tab
  3. Open this file and click Run Script
  OR run from command line:
     blender --background --python generate-table-model.py
"""

import bpy
import bmesh
import math
import os

# ─── Config ───────────────────────────────────────────────────────
EXPORT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "models")
EXPORT_PATH = os.path.join(EXPORT_DIR, "table.glb")

# ─── Clear scene ──────────────────────────────────────────────────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Remove all meshes, materials, etc
for block in bpy.data.meshes:
    bpy.data.meshes.remove(block)
for block in bpy.data.materials:
    bpy.data.materials.remove(block)


# ═══════════════════════════════════════════════════════════════════
# 1. RESIN TOP — Organic lily-pad shape
# ═══════════════════════════════════════════════════════════════════
def create_resin_top():
    """Create organic resin table top with lily-pad undulation."""
    base_r = 0.76
    n = 200
    depth = 0.055  # ~2.7cm slab thickness

    # Create base circle mesh
    bm = bmesh.new()

    # Generate organic outline vertices
    verts_bottom = []
    verts_top = []

    for i in range(n):
        a = (i / n) * math.pi * 2
        # Gentle undulation matching the Three.js code
        r = (base_r
             + base_r * 0.038 * math.sin(a * 5 + 1.10)
             + base_r * 0.018 * math.sin(a * 8 + 2.35)
             + base_r * 0.008 * math.sin(a * 13 + 0.55))

        x = r * math.cos(a)
        z = r * math.sin(a)

        verts_bottom.append(bm.verts.new((x, 0, z)))
        verts_top.append(bm.verts.new((x, depth, z)))

    bm.verts.ensure_lookup_table()

    # Create bottom face
    bm.faces.new(verts_bottom)

    # Create top face (reversed winding for correct normal)
    bm.faces.new(list(reversed(verts_top)))

    # Create side faces
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new([verts_bottom[i], verts_bottom[j], verts_top[j], verts_top[i]])

    bm.normal_update()

    # Create mesh and object
    mesh = bpy.data.meshes.new("ResinTop")
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new("ResinTop", mesh)
    bpy.context.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)

    # Position at pedestal top
    obj.location.y = 0.710

    # Add Subdivision Surface for smooth curves
    subsurf = obj.modifiers.new("Subdivision", 'SUBSURF')
    subsurf.levels = 2
    subsurf.render_levels = 3

    # Add Bevel for refined edges
    bevel = obj.modifiers.new("Bevel", 'BEVEL')
    bevel.width = 0.012
    bevel.segments = 4
    bevel.limit_method = 'ANGLE'
    bevel.angle_limit = math.radians(60)

    # Smooth shading
    bpy.ops.object.shade_smooth()

    # UV Unwrap - smart project (works in background mode)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
    bpy.ops.object.mode_set(mode='OBJECT')

    # Placeholder material (will be replaced in Three.js)
    mat = bpy.data.materials.new("ResinMaterial")
    mat.use_nodes = True
    principled = mat.node_tree.nodes["Principled BSDF"]
    principled.inputs["Base Color"].default_value = (0.231, 0.659, 0.784, 1.0)  # ocean-blue
    principled.inputs["Roughness"].default_value = 0.035
    principled.inputs["IOR"].default_value = 1.52
    obj.data.materials.append(mat)

    obj.select_set(False)
    return obj


# ═══════════════════════════════════════════════════════════════════
# 2. PEDESTAL — Tulip/trumpet shape via curve revolution
# ═══════════════════════════════════════════════════════════════════
def create_pedestal():
    """Create tulip/trumpet pedestal using curve + screw modifier."""
    # Profile points matching Three.js LatheGeometry
    # [radius, height] pairs
    profile_pts = [
        (0.395, 0.000),   # base outer rim
        (0.400, 0.014),   # base lip
        (0.375, 0.032),   # base top edge
        (0.150, 0.095),   # sweeping curve inward
        (0.068, 0.220),   # stem begins
        (0.042, 0.460),   # slim stem
        (0.046, 0.610),   # slight flare upward
        (0.062, 0.710),   # top — connects to table underside
    ]

    # Create curve
    curve_data = bpy.data.curves.new("PedestalProfile", type='CURVE')
    curve_data.dimensions = '2D'

    spline = curve_data.splines.new('NURBS')
    spline.points.add(len(profile_pts) - 1)

    for i, (r, h) in enumerate(profile_pts):
        spline.points[i].co = (r, h, 0, 1)  # x=radius, y=height, z=0, w=1

    spline.use_endpoint_u = True
    spline.order_u = 4  # Smooth NURBS

    curve_obj = bpy.data.objects.new("PedestalProfile", curve_data)
    bpy.context.collection.objects.link(curve_obj)
    bpy.context.view_layer.objects.active = curve_obj
    curve_obj.select_set(True)

    # Add Screw modifier for revolution (72 segments like LatheGeometry)
    screw = curve_obj.modifiers.new("Screw", 'SCREW')
    screw.axis = 'Y'
    screw.steps = 72
    screw.render_steps = 72
    screw.use_merge_vertices = True
    screw.merge_threshold = 0.001

    # Convert to mesh
    bpy.ops.object.convert(target='MESH')

    # Rename
    curve_obj.name = "Pedestal"
    curve_obj.data.name = "Pedestal"

    # Add Subdivision Surface for smoothness
    subsurf = curve_obj.modifiers.new("Subdivision", 'SUBSURF')
    subsurf.levels = 1
    subsurf.render_levels = 2

    # Smooth shading
    bpy.ops.object.shade_smooth()

    # UV Unwrap - smart project (works in background mode)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
    bpy.ops.object.mode_set(mode='OBJECT')

    # Placeholder material
    mat = bpy.data.materials.new("PedestalMaterial")
    mat.use_nodes = True
    principled = mat.node_tree.nodes["Principled BSDF"]
    principled.inputs["Base Color"].default_value = (0.753, 0.784, 0.816, 1.0)  # silver
    principled.inputs["Roughness"].default_value = 0.16
    principled.inputs["Metallic"].default_value = 0.88
    curve_obj.data.materials.append(mat)

    curve_obj.select_set(False)
    return curve_obj


# ═══════════════════════════════════════════════════════════════════
# 3. BASE CAP — Bottom disc
# ═══════════════════════════════════════════════════════════════════
def create_base_cap():
    """Create base disc that closes the pedestal bottom."""
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=72,
        radius=0.395,
        depth=0.014,
        location=(0, 0.007, 0),
    )
    obj = bpy.context.active_object
    obj.name = "BaseCap"
    obj.data.name = "BaseCap"

    # Bevel edges slightly
    bevel = obj.modifiers.new("Bevel", 'BEVEL')
    bevel.width = 0.003
    bevel.segments = 3

    bpy.ops.object.shade_smooth()

    # Use same material as pedestal
    mat = bpy.data.materials.get("PedestalMaterial")
    if mat:
        obj.data.materials.append(mat)

    obj.select_set(False)
    return obj


# ═══════════════════════════════════════════════════════════════════
# BUILD & EXPORT
# ═══════════════════════════════════════════════════════════════════
print("Creating ResinTop...")
resin_top = create_resin_top()

print("Creating Pedestal...")
pedestal = create_pedestal()

print("Creating BaseCap...")
base_cap = create_base_cap()

# Select all table parts
resin_top.select_set(True)
pedestal.select_set(True)
base_cap.select_set(True)

# Apply all modifiers before export
for obj in [resin_top, pedestal, base_cap]:
    bpy.context.view_layer.objects.active = obj
    for mod in obj.modifiers:
        bpy.ops.object.modifier_apply(modifier=mod.name)

# Ensure export directory exists
os.makedirs(EXPORT_DIR, exist_ok=True)

# Export as GLB
print(f"Exporting to {EXPORT_PATH}...")
bpy.ops.export_scene.gltf(
    filepath=EXPORT_PATH,
    export_format='GLB',
    use_selection=True,
    export_apply=True,
    export_yup=True,           # Three.js uses Y-up
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_materials='EXPORT',
)

print(f"Done! Table model exported to: {EXPORT_PATH}")
print(f"Mesh names: ResinTop, Pedestal, BaseCap")
