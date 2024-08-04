provider "google" {
  project = var.project_id
  region  = var.region
  credentials = filebase64decode(var.credentials)
}

resource "google_storage_bucket" "bucket" {
  name     = var.bucket_name
  location = var.region
}

resource "google_app_engine_application" "app" {
  project     = var.project_id
  location_id = var.region
}

resource "google_app_engine_standard_app_version" "app" {
  service  = "default"
  version_id = "v1"
  runtime  = "nodejs14"

  deployment {
    zip {
      source_url = "gs://${google_storage_bucket.bucket.name}/app.zip"
    }
  }
}
